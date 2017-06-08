const React = require('react')
const RaisedButton = require('material-ui/RaisedButton').default
const authFunctions = require('../auth')

const Header = (props) => {
  return (
    <div id="navigation">
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <span className="logo">hint hint</span>
          </div>
          <RaisedButton className="logout-button" label="Log Out" primary={true} onClick={ authFunctions.logOut }/>
        </div>
      </nav>
    </div>
  )
}

module.exports = Header
