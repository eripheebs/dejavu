import { postRequest } from './postRequest.js';

export function getUsers(username, handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/users';

  var reqBody = {
      username: username,
      token: jwt
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}
