const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const getDatabase = require('./db.js')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

app.get('/schedule', (req, res) => {
  getDatabase()
})

app.post('/schedule', (req, res) => {
  getDatabase()
    .then(() => {
      const scheduleItem = req.body
      const updated = database.push(scheduleItem)
      db.put('events', JSON.stringify(updated))
      res.json(scheduleItem)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
