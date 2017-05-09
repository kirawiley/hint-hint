const React = require('react')
const store = require('../store')

const addToSchedule = (scheduleItem) => {
  return fetch('/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scheduleItem)
  })
  .then(() => {
    store.dispatch({ type: 'NEW_EVENT', text: store.getState().form })
  })
}

const EventForm = (props) => {
  const input = store.getState().form
  const { name, date, time, notes } = props
  return (
    <div id="form-container">
      <h5>Create an event:</h5>
      <div className="row">
        <div className="input-field col s4">
          <input placeholder="Event Name" id="event-name-input" value={ input.name } type="text" className="validate" onChange={(event) => {
            store.dispatch({ type: 'INPUT_NAME_CHANGED', text: event.target.value})
          }}/>
        </div>
        <div className="input-field col s4">
          <input placeholder="M / D / Y" id="date-input" value={ input.date } type="text" className="validate" onChange={(event) => {
            store.dispatch({ type: 'INPUT_DATE_CHANGED', text: event.target.value})
          }}/>
        </div>
        <div className="input-field col s4">
          <input placeholder="Time" id="time-input" value={ input.time } type="text" className="validate" onChange={(event) => {
            store.dispatch({ type: 'INPUT_TIME_CHANGED', text: event.target.value})
          }}/>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input placeholder="Event Description/Notes" id="event-notes-input" value={ input.notes } type="text" className="validate" onChange={(event) => {
            store.dispatch({ type: 'INPUT_NOTES_CHANGED', text: event.target.value})
          }}/>
        </div>
        <button id="submit-button" className="btn waves-effect waves-light" type="submit" name="action" onClick={ addToSchedule }>
          Submit
        </button>
      </div>
    </div>
  )
}

module.exports = EventForm
