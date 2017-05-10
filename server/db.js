const levelup = require('levelup')
const db = levelup('./hint-hint')

function getCollection(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      const items = JSON.parse(value)
      resolve(items)
    })
  })
}

function updateCollection(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, (err) => {
      resolve()
    })
  })
}

module.exports = getCollection, updateCollection
