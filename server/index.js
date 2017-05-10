const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { getCollection, updateCollection } = require('./db.js')
const levelup = require('levelup')
const db = levelup('./hint-hint')
const app = express()

app.use(bodyParser.json())

const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

app.get('/schedule', (req, res) => {
  getCollection('events')
    .then((data) => {
      res.json(data)
    })
})

app.post('/schedule', (req, res) => {
  const scheduleItem = req.body
  getCollection('events')
    .then((data) => {
      const updated = data.concat([scheduleItem])
      updateCollection(key, JSON.stringify(updated))
    })
    .then((data) => {
      res.json(data)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
