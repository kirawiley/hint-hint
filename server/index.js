const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dbFunctions = require('./db.js')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const schedule = require('node-schedule')
const twilio = require('twilio')
const accountSid = 'AC09cb09a60883400086fef64b0cdc38dd'
const authToken = '60c540ab832da71ff80bbbe21f452fbc'
const client = new twilio(accountSid, authToken)
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

schedule.scheduleJob('10 * * * *', () => {
  const now = Date.now()
  dbFunctions.getCollection(db, 'events')
    .then(data) => {
      for (let i = 0; i < data.length; i++) {
        (value) => {
          if (value.date === now) {
              client.messages.create({
              body: 'Don\'t forget! ' + value.name + '. ' + value.notes,
              to: '+19492326936',
              from: '+19492390491'
            })
            .then((message) => console.log(message.sid))
          }
        }
      }
    }
})

app.get('/schedule', (req, res) => {
  dbFunctions.getCollection(db, 'events')
    .then((data) => {
      res.json(data)
    })
})

app.post('/schedule', (req, res) => {
  const scheduleItem = req.body
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
