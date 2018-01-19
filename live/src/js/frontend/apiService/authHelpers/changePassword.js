import { postRequest } from '../postRequest.js';

export function changePassword(password, username, handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/changePassword';

  var reqBody = {
      username: username,
      password: password
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}