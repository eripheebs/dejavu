import { postRequest } from '../postRequest.js';

export function changeAdmin(username, handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/changeAdmin';

  var reqBody = {
      username: username
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}