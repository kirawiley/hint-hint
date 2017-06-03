function getToken() {
  return localStorage.getItem('token')
}

function isLoggedIn() {
  if (getToken() !== null && getToken() !== 'undefined') {
    return true
  }
  else {
    return false
  }
}

function setToken(token) {
  localStorage.setItem('token', token)
}

module.exports = { getToken, setToken, isLoggedIn }
