import * as types from './mutation-types'
import utils from './utils'
import axios from 'axios'

var headers = {
    'Content-Type': 'application/json',
    'x-access-token': ''
}

var configureHeader = function (accessToken) {
  var headers = {
      'Content-Type': 'application/json',
      'x-access-token': accessToken
  }
  return headers
}

export const getRequests = ({ commit }, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  var user_id = utils.getUserID()
  return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:3010/requests?ts=${requestPayload.return_ts}&page=${requestPayload.page}&per_page=${requestPayload.per_page}`,
       { headers })
      .then(result => {
        commit(types.GET_REQUEST, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const getRequestDetail = ({ commit }, requestPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.get(`http://127.0.0.1:3010/requests/${requestPayload.ID}`, { headers })
      .then(result => {
        commit(types.REQUEST_DETAIL, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const loginRequest = ({commit}, userPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.post(`http://127.0.0.1:3010/login`, userPayload)
      .then(result => {
        commit(types.USER, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export const signupUseRequest = ({commit}, userPayload) => {
  headers = configureHeader(utils.getAccessToken())
  return new Promise((resolve, reject) => {
    axios.post(`http://127.0.0.1:3010/signup`, userPayload)
      .then(result => {
        commit(types.USER, result.data)
        resolve(result.data)
      }).catch(err => {
        reject(err)
      })
  })
}