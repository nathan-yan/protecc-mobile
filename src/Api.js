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

exports.createUser = function(name, email, password, avatar) {
  return fetch(BASE_URL+"/user/create", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name, 
      email: email, 
      phone: phone,
      password: password,
      profilePicture: avatar
    })
  })
}

exports.reauthenticate = function(){
  return fetch(BASE_URL+"/user/reauthenticate", {
    method: "GET",
    credentials: "include",
  });
}

exports.joinParty = function(roomCode) {
  return fetch(BASE_URL + "/party/join", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      roomCode: roomCode
    })
  })
}

exports.createParty = function() {
  return fetch(BASE_URL + "/party/create", {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  })
}