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
  const stateClone = Object.assign({}, state)
  switch (action.type) {
    case 'INPUT_NAME_CHANGED':
     stateClone.name = action.text
     return stateClone
    case 'INPUT_DATE_CHANGED':
      stateClone.date = action.text
      return stateClone
    case 'INPUT_TIME_CHANGED':
      stateClone.time = action.text
      return stateClone
    case 'INPUT_NOTES_CHANGED':
      stateClone.notes = action.text
      return stateClone
    case 'NEW_EVENT':
      return ''
    default: return state
  }
}

const reducer = Redux.combineReducers({ events, form })
const store = Redux.createStore(reducer)

module.exports = store
