const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

app.get('/schedule', (req, res) => {
  db.get('events', (err, value) => {
    const schedule = JSON.parse(value)
    res.json(schedule)
  })
})

app.post('/schedule', (req, res) => {
  const scheduleItem = req.body
  db.put('events', JSON.stringify(scheduleItem))
  res.json(scheduleItem)
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
