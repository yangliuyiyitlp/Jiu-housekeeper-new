import { USER_LOGIN, USER_LOGOUT, AUTH_UPDATE } from './mutation-types'

export default {
  [USER_LOGIN] (state, user) {
    state.isLogin = true
    state.user = user
  },
  [USER_LOGOUT] (state) {
    state.isLogin = false
  },
  [AUTH_UPDATE] (state, value) {
    state.grantedAuthorities = value
  }
}
