import 'whatwg-fetch';

export function getRequest(url, successCallback, errorCallback, jwt){
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
    method: 'GET',
    headers: headers
    })
  .then(function(response){
    return parse(response);
  })
  .then(function([response, json]){
    if (!response.ok) {
      throw Error(json.error);
    }
    return json.success;
  })
  .then(successCallback)
  .catch(function(error){
    errorCallback(error.message);
  })
}
