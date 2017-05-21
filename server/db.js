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

function findUser(db, phone) {
  return new Promise((resolve, reject) => {
    getCollection(db, 'users')
      .then((data) => {
        const matchingUser = data.find((user) => {
          return user.phone === phone
        })
        if (matchingUser) {
          resolve(matchingUser)
        }
        else {
          reject()
        }
      })
    })
}


module.exports = { getCollection, updateCollection, findUser }
