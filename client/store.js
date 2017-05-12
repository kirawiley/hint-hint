const Redux = require('redux')
const eventsState = []
const formState = {name: '', day: '', time: '', notes: ''}

function events(state = eventsState, action) {
  const stateClone = []
  switch (action.type) {
    case 'NEW_EVENT':
      stateClone.push(action.text)
      return state.concat(stateClone)
    case 'SCHEDULE_LOADED':
      return action.content
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
      stateClone.day = action.text
      return stateClone
    case 'INPUT_TIME_CHANGED':
      stateClone.time = action.text
      return stateClone
    case 'INPUT_NOTES_CHANGED':
      stateClone.notes = action.text
      return stateClone
    case 'NEW_EVENT':
      return formState
    default: return state
  }
}

const reducer = Redux.combineReducers({ events, form })
const store = Redux.createStore(reducer)

module.exports = store
