import { postRequest } from '../postRequest.js';

export function signUp(username, password, admin, handleSuccess, handleError) {
  const url = process.env.URL + 'auth/signUp';

  var reqBody = {
    username: username,
    password: password,
    admin: admin
  }

  postRequest(url, reqBody, handleSuccess, handleError)
}
