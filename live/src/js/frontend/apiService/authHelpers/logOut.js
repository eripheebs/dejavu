import { getRequest } from '../getRequest.js';

export function logOut(successCallback, errorCallback, jwt){
  const url = process.env.URL + "auth/logOut";

  getRequest(url, successCallback, errorCallback, jwt);
}
