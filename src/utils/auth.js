import Cookies from 'js-cookie'
const TokenKey = 'token'
const BackKey = 'back'
const time = new Date(new Date().getTime() + 3 * 60 * 1000)

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: time })
}



export function getToken () {
  return Cookies.get(TokenKey)
}


export function removeToken () {
  return Cookies.remove(TokenKey)
}



export function setBack (back) {
  return Cookies.set(BackKey, back)
}



export function getBack () {
  return Cookies.get(BackKey)
}


export function removeBack () {
  return Cookies.remove(BackKey)
}

