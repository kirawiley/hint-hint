const React = require('react')
const ReactDOM = require('react-dom')
const Redux = require('redux')
const store = require('./store')
const container = document.getElementById('container')
window.store = store

function App(props) {
  return (
    <div>
      <h3>Rendered!</h3>
    </div>
  )
}

function render() {
  const current = store.getState()
  const elements = React.createElement(App, current)
  ReactDOM.render(elements, container)
}

store.subscribe(render)

store.dispatch({ type: 'THIS_IS_A_TEST' })
