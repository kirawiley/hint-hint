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

function findUser(phone) {
  return new Promise((resolve, reject) => {
    getCollection(db, 'users')
      .then((data) => {
        console.log(data)
        const matchingUser = data.find((user) => {
          if (user.phone === phone) {
            resolve(matchingUser)
          }
          else {
            reject()
          }
        })
      })
  })
}

module.exports = { getCollection, updateCollection, findUser }
