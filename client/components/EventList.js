const React = require('react')
const store = require('../store')
const moment = require('moment')

const EventList = (props) => {
  const events = store.getState().events
  const { name, day, time, notes } = props

  const sortedEvents = Array.from(events).sort((a, b) => {
    if (a.date > b.date) {
      return 1
    }
    if (a.date < b.date) {
      return -1
    }
    return 0
  })

  const eachEvent = sortedEvents.map((event, i) => {
    const displayDate = moment(event.date).format('MM/DD/YYYY hh:mm a')
      return (
        <div className="panel panel-default" key={ i }>
          <div className="panel-heading">
            <h3 className="panel-title">
              <span>{ event.name }</span>
              <span>{ displayDate }</span>
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
