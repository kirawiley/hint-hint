const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dbFunctions = require('./db.js')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const moment = require('moment')
const schedule = require('node-schedule')
const twilio = require('twilio')
const dotenv = require('dotenv').config()
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

schedule.scheduleJob('*/10 * * * *', () => {
  const now = Date.now()
  dbFunctions.getCollection(db, 'events')
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let value = data[i]
        const time = moment(value.date).format('hh:mm a')
        if (Math.abs(now - value.date) <= 3600000 && (now - value.date) < 0 && value.notified !== true) {
          value.notified = true
          client.messages.create({
            body: 'Don\'t forget! At ' + time + ' you have ' + value.name + '. ' + value.notes,
            to: '+19492326936',
            from: '+19492390491'
          })
          .then((message) => {
            console.log(message.sid)
          })
        }
      }
      dbFunctions.updateCollection(db, 'events', JSON.stringify(data))
    })
})

app.get('/schedule', (req, res) => {
  dbFunctions.getCollection(db, 'events')
    .then((data) => {
      res.json(data)
    })
})

app.post('/schedule', (req, res) => {
  const scheduleItem = req.body
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

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
