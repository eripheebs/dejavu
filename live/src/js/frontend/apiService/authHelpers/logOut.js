import { getRequest } from '../getRequest.js';

export function logOut(successCallback, errorCallback, jwt){
  const url = 'http://localhost:8080/auth/logOut';

  getRequest(url, successCallback, errorCallback, jwt);
}
