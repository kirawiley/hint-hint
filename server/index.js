const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

const schedule = []

app.get('/schedule', (req, res) => {
  res.json(schedule)
})

app.post('/schedule', (req, res) => {
  const scheduleItem = req.body
  schedule.push(scheduleItem)
  res.sendStatus(201).json(scheduleItem)
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
