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

schedule.scheduleJob('*/1 * * * *', () => {
  const now = Date.now()
  const promises = []
  dbFunctions.getCollection(db, 'events')
    .then((data) => {
      const valid = data.filter((event) => {
        return Math.abs(now - event.date) <= 3600000 && (now - event.date) < 0 && event.notified !== true
      })
      for (let i = 0; i < valid.length; i++) {
        let event = valid[i]
        const time = moment(event.date).format('hh:mm a')
        event.notified = true
        promises.push(client.messages.create({
          body: 'Don\'t forget! At ' + time + ' you have ' + event.name + '. ' + event.notes,
          to: process.env.RECIPIENT_PHONE_NUMBER,
          from: process.env.TWILIO_PHONE_NUMBER
        }))
        .then((message) => {
          console.log(message.sid)
        })
        Promise.all(promises)
        .then(() => {
          dbFunctions.updateCollection(db, 'events', JSON.stringify(data))
        })
      }
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
