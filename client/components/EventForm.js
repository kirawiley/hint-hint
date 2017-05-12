const React = require('react')
const store = require('../store')
const moment = require('moment')
const RaisedButton = require('material-ui/RaisedButton').default
const TextField = require('material-ui/TextField').default
const DatePicker = require('material-ui/DatePicker').default
const TimePicker = require('material-ui/TimePicker').default

const EventForm = (props) => {
  const input = store.getState().form
  const schedule = store.getState().events
  const { name, day, time, notes } = props

  const formatSchedule = (formState) => {
    const combinedDate = new Date(formState.day + ' ' + formState.time)
    return {
      name: formState.name,
      date: combinedDate.valueOf(),
      notes: formState.notes
    }
  }

  const addToSchedule = () => {
    const formState = store.getState().form
    const scheduleItem = formatSchedule(formState)
    return fetch('/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scheduleItem)
    })
    .then(() => {
      store.dispatch({ type: 'NEW_EVENT', text: scheduleItem })
    })
  }

  return (
    <div id="form-container">
      <h4>Create an event:</h4>
      <div className="row">
        <div className="col-xs-4">
          <TextField
            className="event-name-input"
            floatingLabelText="Event Name"
            floatingLabelFixed={true}
            value={ input.name }
            onChange={(event) => {
              store.dispatch({ type: 'INPUT_NAME_CHANGED', text: event.target.value })
            }}
            />
        </div>
        <div className="col-xs-4">
          <DatePicker className="event-date-input"
            floatingLabelText="Date"
            floatingLabelFixed={true}
            onChange={(_, date) => {
              const month = date.getMonth() + 1
              const dateString = date.getFullYear() + '/' + month + '/' + date.getDate()
              store.dispatch({ type: 'INPUT_DATE_CHANGED', text: dateString })
            }}/>
        </div>
        <div className="col-xs-4">
          <TimePicker className="event-time-input"
            floatingLabelText="Time"
            floatingLabelFixed={true}
            onChange={(_, date) => {
              const timeString = date.getHours() + ':' + date.getMinutes()
              store.dispatch({ type: 'INPUT_TIME_CHANGED', text: timeString })
            }}/>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6">
          <TextField
            className="event-notes-input"
            floatingLabelText="Event Description/Notes"
            floatingLabelFixed={true}
            value={ input.notes }
            onChange={(event) => {
              store.dispatch({ type: 'INPUT_NOTES_CHANGED', text: event.target.value })
            }}
            />
        </div>
        <div className="col-xs-6">
          <RaisedButton className="submit-button" label="Submit" primary={true} onClick={ addToSchedule }/>
        </div>
      </div>
    </div>
  )
}

module.exports = EventForm
