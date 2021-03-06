const React = require('react')
const store = require('../store')
const authFunctions = require('../auth')
const RaisedButton = require('material-ui/RaisedButton').default
const TextField = require('material-ui/TextField').default

const LogIn = (props) => {
  const user = store.getState().logIn

  const openEvents = () => {
    if (authFunctions.isLoggedIn()) {
      store.dispatch({ type: 'EVENTS_OPEN' })
    }
  }

  const logInToken = () => {
    const logInUser = {
      phone: '+1' + user.phone,
      password: user.password
    }
    return fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logInUser)
      })
      .then((res) => {
        return res.json()
      })
      .then((tokenObject) => {
        authFunctions.setToken(tokenObject.token)
        openEvents()
      })
  }

  return (
    <div className="border" id="login-container">
      <div className="row">
        <div className="col-xs-12">
          <TextField
            className="login-phone-input"
            floatingLabelText="Phone"
            floatingLabelFixed={true}
            onChange={(event) => {
              store.dispatch({ type: 'LOGIN_PHONE_CHANGED', text: event.target.value })
            }}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TextField
            className="login-password-input"
            floatingLabelText="Password"
            floatingLabelFixed={true}
            onChange={(event) => {
              store.dispatch({ type: 'LOGIN_PASSWORD_CHANGED', text: event.target.value })
            }}
            />
        </div>
      </div>
      <div className="row">
          <RaisedButton className="login-button" label="Log In" primary={true} onClick={ logInToken }/>
      </div>
    </div>
  )
}

module.exports = LogIn
