const React = require('react')
const ReactDOM = require('react-dom')
const store = require('../store')
const LogIn = require('./LogIn')
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default
const injectTapEventPlugin = require('react-tap-event-plugin')
const RaisedButton = require('material-ui/RaisedButton').default
const TextField = require('material-ui/TextField').default
const container = document.getElementById('container')

const SignUp = (props) => {
  const user = store.getState().signUp
  const { name, phone, password } = props

  const addUser = () => {
    return fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formatUser(user))
      })
      .then(() => {
        store.dispatch({ type: 'NEW_USER', text: user })
      })
  }

  const formatUser = (user) => {
    if (user.phone.length === 10) {
      alert('Welcome to hint hint! Please use the link below to sign in to your new account.')
      const phoneFormat = '+1' + user.phone
      return {
        name: user.name,
        phone: phoneFormat,
        password: user.password
      }
    }

    else {
      alert('Please only use numbers when inputting your phone number.')
    }
  }

  return (
    <div className="border" id="signup-container">
      <div className="row">
        <h3 className="logo">hint hint</h3>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TextField
            className="signup-name-input"
            floatingLabelText="Name"
            floatingLabelFixed={true}
            onChange={(event) => {
              store.dispatch({ type: 'SIGNUP_NAME_CHANGED', text: event.target.value })
            }}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TextField
            className="signup-phone-input"
            floatingLabelText="Phone"
            floatingLabelFixed={true}
            onChange={(event) => {
              store.dispatch({ type: 'SIGNUP_PHONE_CHANGED', text: event.target.value })
            }}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TextField
            className="signup-password-input"
            floatingLabelText="Password"
            floatingLabelFixed={true}
            onChange={(event) => {
              store.dispatch({ type: 'SIGNUP_PASSWORD_CHANGED', text: event.target.value })
            }}
            />
        </div>
      </div>
      <div className="row">
          <RaisedButton className="signup-button" label="Sign Up" primary={true} onClick={ addUser }/>
      </div>
      <div className="row">
        <span id="login-link" onClick={() => {
          store.dispatch({ type: 'LOG_IN_OPEN' })
          }}>Already registered? Log in here.</span>
      </div>
    </div>
  )
}

module.exports = SignUp
