const Redux = require('redux')
const formState = {name: '', day: '', dayObject: null, time: '', timeObject: null, notes: ''}
const signUpState = {name: '', phone: '', password: ''}
const logInState = {phone: '', password: ''}

function events(state = [], action) {
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

function areEventsOpen(state = false, action) {
  switch (action.type) {
    case 'EVENTS_OPEN':
      return true
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
      stateClone.dayObject = action.date
      return stateClone
    case 'INPUT_TIME_CHANGED':
      stateClone.time = action.text
      stateClone.timeObject = action.date
      return stateClone
    case 'INPUT_NOTES_CHANGED':
      stateClone.notes = action.text
      return stateClone
    case 'NEW_EVENT':
      return formState
    default: return state
  }
}

function users(state = [], action) {
  const stateClone = []
  switch (action.type) {
    case 'NEW USER':
      stateClone.push(action.text)
      return state.concat(stateClone)
    default: return state
  }
}

function signUp(state = signUpState, action) {
  const stateClone = Object.assign({}, state)
  switch (action.type) {
    case 'SIGNUP_NAME_CHANGED':
      stateClone.name = action.text
      return stateClone
    case 'SIGNUP_PHONE_CHANGED':
      stateClone.phone = action.text
      return stateClone
    case 'SIGNUP_PASSWORD_CHANGED':
      stateClone.password = action.text
      return stateClone
    default: return state
  }
}

function isLogInOpen(state = false, action) {
  switch (action.type) {
    case 'LOG_IN_OPEN':
      return true
    default: return state
  }
}

function logIn(state = logInState, action) {
  const stateClone = Object.assign({}, state)
  switch (action.type) {
    case 'LOGIN_PHONE_CHANGED':
      stateClone.phone = action.text
      return stateClone
    case 'LOGIN_PASSWORD_CHANGED':
      stateClone.password = action.text
      return stateClone
    default: return state
  }
}

const reducer = Redux.combineReducers({ events, areEventsOpen, form, users, signUp, isLogInOpen, logIn })
const store = Redux.createStore(reducer)

module.exports = store
