const React = require('react')
const store = require('../store')
const RaisedButton = require('material-ui/RaisedButton').default
const TextField = require('material-ui/TextField').default
const DatePicker = require('material-ui/DatePicker').default
const TimePicker = require('material-ui/TimePicker').default

const EventForm = (props) => {
  const input = store.getState().form
  const schedule = store.getState().events
  const { name, date, time, notes } = props

  const addToSchedule = () => {
    const formState = store.getState().form
    return fetch('/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    .then(() => {
      store.dispatch({ type: 'NEW_EVENT', text: formState })
    })
  }

  return (
    <div id="form-container">
      <h5>Create an event:</h5>
      <div className="row">
        <div className="col-xs-4">
          <TextField
            id="event-name-input"
            floatingLabelText="Event Name"
            floatingLabelFixed={true}
            value={ input.name }
            onChange={(event) => {
              store.dispatch({ type: 'INPUT_NAME_CHANGED', text: event.target.value })
            }}
            />
        </div>
        <div className="col-xs-4">
          <DatePicker id="event-date-input" hintText="Date" onChange={(event) => {
            store.dispatch({ type: 'INPUT_DATE_CHANGED', text: '' })
          }}/>
        </div>
        <div className="col-xs-4">
          <TimePicker id="event-time-input" hintText="Time" onChange={(event) => {
            store.dispatch({ type: 'INPUT_TIME_CHANGED', text: '' })
          }}/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6">
          <TextField
            id="event-notes-input"
            floatingLabelText="Event Description/Notes"
            floatingLabelFixed={true}
            value={ input.notes }
            onChange={(event) => {
              store.dispatch({ type: 'INPUT_NOTES_CHANGED', text: event.target.value })
            }}
            />
        </div>
        <div className="col-xs-6">
          <RaisedButton id="submit-button" label="Submit" primary={true} />
        </div>
      </div>
    </div>
  )
}

module.exports = EventForm
