export function successMessage(res, message){
  res.send({ "success" : message });
}

export function errorMessage(res, message){
  res.status(500).send({ "error" : message});
}
