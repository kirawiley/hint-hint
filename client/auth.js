const isLoggedIn = (token) => {

}

const getToken = (token) => {
  localStorage.getItem(token)
}

const setToken = (token) => {
  localStorage.setItem('token', token)
}

module.exports = { getToken, setToken }
