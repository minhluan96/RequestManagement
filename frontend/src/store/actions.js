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
  headers = configureHeader("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoxLCJVc2VybmFtZSI6Im1pbmhsdWFuIiwiUGFzc3dvcmQiOiI2MDQwMjQ3ZjMwMmU0ZWI0OTRiZGZiYmNjZDg4NWE3ZiIsIlJlZnJlc2hUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcDdJa2xFSWpveExDSlZjMlZ5Ym1GdFpTSTZJbTFwYm1oc2RXRnVJaXdpVUdGemMzZHZjbVFpT2lJMk1EUXdNalEzWmpNd01tVTBaV0kwT1RSaVpHWmlZbU5qWkRnNE5XRTNaaUlzSWxKbFpuSmxjMmhVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVWx6U1c1U05XTkRTVFpKYTNCWVZrTktPUzVsZVVveFl6SldlVWxxY0RkSmEyeEZTV3B2ZUV4RFNsWmpNbFo1WW0xR2RGcFRTVFpKYlRGd1ltMW9jMlJYUm5WSmFYZHBWVWRHZW1NelpIWmpiVkZwVDJsSk1rMUVVWGROYWxFeldtcE5kMDF0VlRCYVYwa3dUMVJTYVZwSFdtbFpiVTVxV2tSbk5FNVhSVE5hYVVselNXeEtiRnB1U214ak1taFZZakowYkdKcFNUWkphbEUwVGpKWk0xbHFTWGxhYWxrMFRYcEZlVnBFU21wTlYwcHBXWHByZWxscVJtaGFWMFV3VGtSV2FVbHBkMmxUVlZKbVZXMDVjMXBZVFdsUGFrbzVURU5LY0ZsWVVXbFBha1V4VGtSUmVFOVVRVE5OYWxWelNXMVdOR05EU1RaTlZGVXdUa1JKTTA1NlJYbE9XREF1Y2pCb05rUjZOV1JUVFhScFpWbG5kMEkwVjBwM1RsTk1UREUwVm1sV05FRlhRbG80TFhOaU0zRjVUU0lzSWtsRVgxSnZiR1Z6SWpveWZTd2lhV0YwSWpveE5UUTBNalE1T1RRMkxDSmxlSEFpT2pFMU5EUXpNell6TkRaOS56N1NtMjRMM21PbHMyS2tOT2dKSzdnOGE1U1cxVmJVZFMzeWV4UmVxMk9zIiwiSURfUm9sZXMiOjIsIlN0YXR1cyI6Mn0sImlhdCI6MTU0NDgwNjExMSwiZXhwIjoxNTQ0ODkyNTExfQ.gDCqlPlDm19b28abmgB4F9GVe0fxNe3TLix7RSIILHU")
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
  headers = configureHeader("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoxLCJVc2VybmFtZSI6Im1pbmhsdWFuIiwiUGFzc3dvcmQiOiI2MDQwMjQ3ZjMwMmU0ZWI0OTRiZGZiYmNjZDg4NWE3ZiIsIlJlZnJlc2hUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcDdJa2xFSWpveExDSlZjMlZ5Ym1GdFpTSTZJbTFwYm1oc2RXRnVJaXdpVUdGemMzZHZjbVFpT2lJMk1EUXdNalEzWmpNd01tVTBaV0kwT1RSaVpHWmlZbU5qWkRnNE5XRTNaaUlzSWxKbFpuSmxjMmhVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVWx6U1c1U05XTkRTVFpKYTNCWVZrTktPUzVsZVVveFl6SldlVWxxY0RkSmEyeEZTV3B2ZUV4RFNsWmpNbFo1WW0xR2RGcFRTVFpKYlRGd1ltMW9jMlJYUm5WSmFYZHBWVWRHZW1NelpIWmpiVkZwVDJsSk1rMUVVWGROYWxFeldtcE5kMDF0VlRCYVYwa3dUMVJTYVZwSFdtbFpiVTVxV2tSbk5FNVhSVE5hYVVselNXeEtiRnB1U214ak1taFZZakowYkdKcFNUWkphbEUwVGpKWk0xbHFTWGxhYWxrMFRYcEZlVnBFU21wTlYwcHBXWHByZWxscVJtaGFWMFV3VGtSV2FVbHBkMmxUVlZKbVZXMDVjMXBZVFdsUGFrbzVURU5LY0ZsWVVXbFBha1V4VGtSUmVFOVVRVE5OYWxWelNXMVdOR05EU1RaTlZGVXdUa1JKTTA1NlJYbE9XREF1Y2pCb05rUjZOV1JUVFhScFpWbG5kMEkwVjBwM1RsTk1UREUwVm1sV05FRlhRbG80TFhOaU0zRjVUU0lzSWtsRVgxSnZiR1Z6SWpveWZTd2lhV0YwSWpveE5UUTBNalE1T1RRMkxDSmxlSEFpT2pFMU5EUXpNell6TkRaOS56N1NtMjRMM21PbHMyS2tOT2dKSzdnOGE1U1cxVmJVZFMzeWV4UmVxMk9zIiwiSURfUm9sZXMiOjIsIlN0YXR1cyI6Mn0sImlhdCI6MTU0NDgwNjExMSwiZXhwIjoxNTQ0ODkyNTExfQ.gDCqlPlDm19b28abmgB4F9GVe0fxNe3TLix7RSIILHU")
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
