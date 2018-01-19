import { postRequest } from '../postRequest.js';

export function toggleBlock(handleSuccess, handleError, jwt) {
  const url = 'http://localhost:8080/auth/toggleBlock';

  var reqBody = {
  }

  postRequest(url, reqBody, handleSuccess, handleError, jwt)
}
