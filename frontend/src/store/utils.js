var getAccessToken = function () {
  var user = JSON.parse(localStorage.getItem('user'))
  if (user == null) return ''
  return user.accessToken
}

var saveUser = function (user) {
  localStorage.setItem('user', JSON.stringify(user))
}

var getUserID = function () {
  var user = JSON.parse(localStorage.getItem('user'))
  if (user == null) return ''
  return user.user.id
}

export default { getAccessToken, saveUser, getUserID }
