const isLoggedIn = () => {

}

const getToken = (token) => {
  localStorage.getItem(token)
}

const setToken = (user) => {
  localStorage.setItem('token', user)
}

module.exports = { getToken, setToken }
