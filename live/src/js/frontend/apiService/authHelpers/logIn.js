import { postRequest } from '../postRequest.js';

export function logIn(username, password, handleSuccess, handleError) {
  const url = 'http://localhost:8080/auth/logIn';

  var reqBody = {
    username: username,
    password: password
  }

  postRequest(url, reqBody, handleSuccess, handleError)
}
