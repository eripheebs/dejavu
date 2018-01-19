import { postRequest } from '../postRequest.js';

export function toggleBlock(username, handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/toggleBlock';

  var reqBody = {
      username: username
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}
