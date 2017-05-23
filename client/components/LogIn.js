const React = require('react')
const store = require('../store')
const authFunctions = require('../auth')
const RaisedButton = require('material-ui/RaisedButton').default
const TextField = require('material-ui/TextField').default

const LogIn = (props) => {
  /*const logInUser = () => {
    return fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          'Authorization': 'Bearer ' + authFunctions.setToken()
        }//,
        //body: JSON.stringify(user)
      })
      .then(() => {
        if(isLoggedIn()) {
          return
        }
      })
    })
  }*/

  return (
    <div id="login-container">
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
          <RaisedButton className="login-button" label="Log In" primary={true}/>
      </div>
    </div>
  )
}

module.exports = LogIn
