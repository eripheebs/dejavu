import 'whatwg-fetch';

export function postRequest(url, reqBody, successCallback, errorCallback, jwt = null){
  const AUTH_ERROR = "You need to be logged in to access this feature"

  function parse(response){
    if (response.status == 401){
      throw Error(AUTH_ERROR);
    }
    return Promise.all([response, response.json()]);
  }

  var headers;
  if (jwt) {
    headers = {
      'Authorization': jwt,
      'Content-Type': 'application/json'
    }
  } else {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(reqBody)
  })
  .then(parse)
  .then(function([response, json]){
    if (!response.ok) {
      throw Error(json.error);
    }
    return json
  })
  .then(successCallback)
  .catch(function(error){
    errorCallback(error.message);
  });
}
