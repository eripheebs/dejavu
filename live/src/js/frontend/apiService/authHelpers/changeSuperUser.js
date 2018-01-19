import { postRequest } from '../postRequest.js';

export function changeSuperUser(username, handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/changeSuperUser';

  var reqBody = {
      username: username
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}