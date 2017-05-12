const React = require('react')
const store = require('../store')
const moment = require('moment')

const EventList = (props) => {
  const events = store.getState().events
  const { name, day, time, notes } = props

  const eachEvent = events.map((event, i) => {
    const displayDay = moment(event.day).format('MM/DD/YYYY')
    const displayTime = moment(event.time).format('HH:mm a')

      return (
        <div className="panel panel-default" key={ i }>
          <div className="panel-heading">
            <h3 className="panel-title">
              <span>{ event.name }</span>
              <span>{ displayDay }</span>
              <span>{ displayTime }</span>
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
