const React = require('react')
const ReactDOM = require('react-dom')
const Redux = require('redux')
const SignUp = require ('./components/SignUp')
const LogIn = require('./components/LogIn')
const EventForm = require('./components/EventForm')
const EventList = require('./components/EventList')
const Header = require('./components/Header')
const store = require('./store')
const authFunctions = require('./auth')
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default
const injectTapEventPlugin = require('react-tap-event-plugin')
const container = document.getElementById('container')
window.store = store
injectTapEventPlugin()

const fetchEvents = () => {
  return fetch('/schedule', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authFunctions.getToken()
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((schedule) => {
      store.dispatch({ type: 'SCHEDULE_LOADED', content: schedule })
    })
    .catch(() => {
      console.log('error: could not retrieve events')
    })
}

function App(props) {
  if (!authFunctions.isLoggedIn() && store.getState().isLogInOpen) {
    return (
      <MuiThemeProvider>
        <LogIn/>
      </MuiThemeProvider>
    )
  }

  else if (authFunctions.isLoggedIn()) {
    fetchEvents()
    return (
      <div>
        <MuiThemeProvider>
          <Header/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <EventForm/>
        </MuiThemeProvider>
        <EventList/>
      </div>
    )
  }

  else {
    return (
      <MuiThemeProvider>
        <SignUp/>
      </MuiThemeProvider>
    )
  }
}

function render() {
  const current = store.getState()
  const elements = React.createElement(App, current)
  ReactDOM.render(elements, container)
}

render()
store.subscribe(render)
