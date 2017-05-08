const React = require('react')
const ReactDOM = require('react-dom')
const Redux = require('redux')
const EventForm = require('./EventForm')
const store = require('./store')
const container = document.getElementById('container')
window.store = store

function App(props) {
  return (
    <div>
      <EventForm/>
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
