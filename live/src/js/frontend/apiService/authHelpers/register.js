import { postRequest } from '../postRequest.js';

export function signUp(username, password, admin, superUser, handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/signUp';

  var reqBody = {
    username: username,
    password: password,
    admin: admin, 
    superUser: superUser
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}
