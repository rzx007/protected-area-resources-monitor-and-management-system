import Cookies from 'js-cookie'
const { VUE_APP_ADMIN } = process.env
const domainName = window.location.hostname + window.location.pathname
export function getToken (name) {
  // return Cookies.get(name)
  return sessionStorage.getItem(name)
}

export function setToken (name, token) {
  sessionStorage.setItem(name, token)
}

export function removeToken (name) {
  return sessionStorage.removeItem(name)
}

export function removeAllToken () {
  return sessionStorage.clear()
}

export function isAdmin () {
  return domainName === VUE_APP_ADMIN
}
