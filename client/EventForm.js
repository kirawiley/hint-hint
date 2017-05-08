const React = require('react')
const store = require('./store')

const EventForm = (props) => {
  const { name, date, time, notes } = props
  const handleChange = (event) => {
    store.dispatch({ type: 'INPUT_CHANGED', text: event.target.value})
  }
  return (
    <div id="form-container">
      <h5>Create an event:</h5>
      <div className="row">
        <div className="input-field col s4">
          <input placeholder="Event Name" id="event-name-input" type="text" className="validate" onChange={ handleChange }/>
        </div>
        <div className="input-field col s4">
          <input placeholder="M / D / Y" id="date-input" type="text" className="validate" onChange={ handleChange }/>
        </div>
        <div className="input-field col s4">
          <input placeholder="Time" id="time-input" type="text" className="validate" onChange={ handleChange }/>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input placeholder="Event Description/Notes" id="event-notes-input" type="text" className="validate" onChange={ handleChange }/>
        </div>
        <button id="submit-button" className="btn waves-effect waves-light" type="submit" name="action">
          Submit
        </button>
      </div>
    </div>
  )
}

module.exports = EventForm
