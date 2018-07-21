const BASE_URL = "https://api.protecc.us/api"

exports.login = function(email, password) {
  return fetch(BASE_URL+"/login", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
}

exports.reauthenticate = function(){
  return fetch(BASE_URL+"/user/reauthenticate", {
    method: "GET",
    credentials: "include",
  });
}

