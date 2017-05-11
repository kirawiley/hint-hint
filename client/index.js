const React = require('react')
const ReactDOM = require('react-dom')
const Redux = require('redux')
const EventForm = require('./components/EventForm')
const EventList = require('./components/EventList')
const store = require('./store')
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider')
const injectTapEventPlugin = require('react-tap-event-plugin')
const container = document.getElementById('container')
injectTapEventPlugin()
window.store = store

fetch('/schedule')
.then((response) => {
  return response.json()
})
.then((schedule) => {
  store.dispatch({ type: 'SCHEDULE_LOADED', content: schedule })
})

function App(props) {
  return (
    <div>
      <MuiThemeProvider>
        <EventForm/>
      </MuiThemeProvider>
      <EventList/>
    </div>
  )
}

function render() {
  const current = store.getState()
  const elements = React.createElement(App, current)
  ReactDOM.render(elements, container)
}

render()
store.subscribe(render)
