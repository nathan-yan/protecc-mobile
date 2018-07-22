import cookieManager from "react-native-cookies";
import storage from "react-native";


const BASE_URL = "https://api.protecc.us/api"
//const BASE_URL = "http://192.168.0.37:3000/api"

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
    }),
    credentials: "include",

  })
}

exports.createUser = function(name, email, phone, password, avatar) {
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
      profilePicture: avatar.uri
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
    }),
    credentials: "include",
  })
}

exports.createParty = function() {
  return fetch(BASE_URL + "/party/create", {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    credentials: "include",
  })
}

exports.getUser = function() {
  return fetch(BASE_URL+"/user", {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    credentials: "include" 
  })
}

exports.getParty = function(){
  return fetch(BASE_URL + "/party", {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    credentials: "include" 
  })
}

exports.updateLocation = function(lat, lon) {
  return fetch(BASE_URL + "/update/location", {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      lat: lat,
      lon: lon
    }),
    credentials: "include",
  })
}
