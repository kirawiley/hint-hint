const React = require('react')
const store = require('../store')
const TextField = require('material-ui/TextField')
const DatePicker = require('material-ui/DatePicker')
const TimePicker = require('material-ui/TimePicker')

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
        <TextField
          floatingLabelText="Event Name"
          floatingLabelFixed={true}
          value={ input.name }
          onChange={(event) => {
            store.dispatch({ type: 'INPUT_NAME_CHANGED', text: event.target.value })
          }}
          />

        <DatePicker hintText="Date" onChange={(event) => {
          store.dispatch({ type: 'INPUT_DATE_CHANGED', text: event.target.value })
        }}/>

        <TimePicker hintText="Time" onChange={(event) => {
          store.dispatch({ type: 'INPUT_TIME_CHANGED', text: event.target.value })
        }}/>

        <TextField
          floatingLabelText="Event Description/Notes"
          floatingLabelFixed={true}
          value={ input.notes }
          onChange={(event) => {
            store.dispatch({ type: 'INPUT_NOTES_CHANGED', text: event.target.value })
          }}
          />
      </div>
      <div className="row">
        <button id="submit-button" className="btn waves-effect waves-light" type="submit" name="action" onClick={ addToSchedule }>
          Submit
        </button>
      </div>
    </div>
  )
}

module.exports = EventForm
