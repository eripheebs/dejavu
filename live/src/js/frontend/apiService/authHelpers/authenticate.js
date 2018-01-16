import { postRequest } from '../postRequest.js';

export function authenticate(jwt, handleSuccess, handleError) {
  const url = 'http://localhost:8080/auth/authenticate';

  var reqBody = {
      jwt: jwt
  }

  postRequest(url, reqBody, handleSuccess, handleError)
}
