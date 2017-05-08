const Redux = require('redux')
const state = ['testing']

function reducer(state, action) {
  switch (action.type) {
    case 'THIS_IS_A_TEST':
     return state + ' worked'
    default: return state
  }
}

const store = Redux.createStore(reducer, state)

module.exports = store
