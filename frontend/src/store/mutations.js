import * as types from './mutation-types'

export const mutations = {
  [types.GET_REQUEST] (state, requestPayload) {
    state.requests = requestPayload
  },
  [types.USER] (state, userPayload) {
    state.user = userPayload
  },
  [types.REQUEST_DETAIL] (state, requestPayload) {
    state.requestItem = requestPayload
  },
  [types.GET_DRIVER] (state, driverPayload) {
    state.driver = driverPayload
  }
}
