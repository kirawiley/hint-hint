const isLoggedIn = () => {
  if (getToken() !== null) {
    return true
  }
  else {
    return false
  }
}

const getToken = () => {
  return localStorage.getItem('token')
}

const setToken = (token) => {
  localStorage.setItem('token', token)
}

module.exports = { getToken, setToken, isLoggedIn }
