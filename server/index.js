const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dbFunctions = require('./db.js')
const getToken = require('./getToken')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const moment = require('moment')
const schedule = require('node-schedule')
const twilio = require('twilio')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtExpress = require('express-jwt')
const bcrypt = require('bcrypt')
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

schedule.scheduleJob('*/10 * * * *', () => {
  const now = Date.now()
  const clientMessagePromises = []
  dbFunctions.getCollection(db, 'events')
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let event = data[i]
        const time = moment(event.date).format('hh:mm a')
        const withinOneHour = (now, event) => {
          return Math.abs(now - event.date) <= 3600000 && (now - event.date) < 0
        }
        if (withinOneHour(now, event) && !event.notified) {
          clientMessagePromises.push(client.messages.create({
            body: 'Don\'t forget! At ' + time + ' you have ' + event.name + '. ' + event.notes,
            to: process.env.RECIPIENT_PHONE_NUMBER,
            from: process.env.TWILIO_PHONE_NUMBER
          })
          .then((message) => {
            event.notified = true
            return message.sid
          }))
        }
    }
    Promise.all(clientMessagePromises)
    .then(() => {
      dbFunctions.updateCollection(db, 'events', JSON.stringify(data))
    })
  })
})

app.get('/schedule', jwtExpress({ secret: process.env.SECRET }), (req, res) => {
  const userPhone = req.user.phone
  dbFunctions.findUser(db, userPhone)
    .then((user) => {
      dbFunctions.getCollection(db, 'events')
        .then((events) => {
          const userEvents = events.filter((event) => {
            return event.phone === userPhone
          })
          if (userEvents) {
            res.json(userEvents)
          }
          else {
            return res.status(404).json({ error: 'no events found' })
          }
        })
    })
})

app.post('/schedule', jwtExpress({ secret: process.env.SECRET }), (req, res) => {
  const user = req.user.phone
  const scheduleItem = req.body
  scheduleItem.phone = user
  scheduleItem.notified = false
  dbFunctions.getCollection(db, 'events')
    .then((data) => {
      const updated = data.concat([scheduleItem])
      return dbFunctions.updateCollection(db, 'events', JSON.stringify(updated))
    })
    .then(() => {
      res.json(scheduleItem)
    })
})

app.post('/signup', (req, res) => {
  const { name, phone, password } = req.body
  dbFunctions.getCollection(db, 'users')
    .then((data) => {
      const hashPassword = bcrypt.hashSync(password, 10)
      const newUser = data.concat([{ name, phone, hashPassword }])
      dbFunctions.updateCollection(db, 'users', JSON.stringify(newUser))
      const payload = {
        name: name,
        phone: phone
      }
      return getToken(payload)
    })
    .then((token) => {
      res.json({ token })
    })
})

app.post('/login', (req, res) => {
  const { phone, password } = req.body
  dbFunctions.findUser(db, phone)
    .then((user) => {
      if (bcrypt.compareSync(password, user.hashPassword)) {
        const payload = {
          phone: phone
        }
        const token = getToken(payload)
        res.json({ token })
      }
      else {
        return res.status(401).json({ error: 'incorrect password' })
      }
    })
    .catch(() => {
      return res.status(404).json({ error: 'user not found' })
    })
})

app.use((err, req, res, next) => {
  if (err) {
    return res.status(401).json({ error: 'not authorized' })
  }
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
