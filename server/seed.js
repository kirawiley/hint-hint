const levelup = require('levelup')
const db = levelup('./hint-hint')

db.put('events', JSON.stringify([]))
