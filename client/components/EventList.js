const React = require('react')
const store = require('../store')
const moment = require('moment')

const EventList = (props) => {
  const events = store.getState().events
  const { name, day, time, notes } = props

  const eachEvent = events.map((event, i) => {

      return (
        <div className="panel panel-default" key={ i }>
          <div className="panel-heading">
            <h3 className="panel-title">
              <span>{ event.name }</span>
              <span>{ event.day }</span>
              <span>{ event.time }</span>
            </h3>
          </div>
          <div className="panel-body">
            <p id="notes">{ event.notes }</p>
          </div>
        </div>
      )
    })
  return (
    <div>
      { eachEvent }
    </div>
  )
}

module.exports = EventList
