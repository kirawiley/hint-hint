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
  db.get('items', (err, value) => {
    const schedule = JSON.parse(value)
    console.log(schedule)
  })
})

app.post('/schedule', (req, res) => {
  const scheduleItem = req.body
  db.put('items', JSON.stringify(scheduleItem))
  res.sendStatus(201).json(scheduleItem)
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
