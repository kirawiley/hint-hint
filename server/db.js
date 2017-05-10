const levelup = require('levelup')
const db = levelup('./hint-hint')

function getDatabase() {
  new Promise((resolve, reject) => {
    db.get('events', (err, value) => {
      const schedule = JSON.parse(value)
      res.json(schedule)
      resolve()
    })
  })
}

module.exports = getDatabase
