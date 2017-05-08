const Redux = require('redux')
const eventsState = []
const formState = {name: '', date: '', time: '', notes: ''}

function events(state = eventsState, action) {
  switch (action.type) {
    case 'NEW_EVENT':
      return state.concat(action.text)
    default: return state
  }
}

function form(state = formState, action) {
  switch (action.type) {
    case 'INPUT_CHANGED':
     return action.text
    case 'NEW_EVENT':
      return ''
    default: return state
  }
}

const reducer = Redux.combineReducers({ events, form })
const store = Redux.createStore(reducer)

module.exports = store
