import Cookies from 'js-cookie'

const TokenKey = 'token'


// let Store = window.localStorage
// export function getToken() {
//   return Store.getItem(TokenKey)
// }

// export function setToken(token) {
//   return Store.setItem(TokenKey, token)
// }

// export function removeToken() {
//   return Store.removeItem(TokenKey)
// }


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
