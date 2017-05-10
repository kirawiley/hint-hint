const levelup = require('levelup')

function getCollection(db, key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      const items = JSON.parse(value)
      resolve(items)
    })
  })
}

function updateCollection(db, key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, (err) => {
      resolve()
    })
  })
}

module.exports = { getCollection, updateCollection }
