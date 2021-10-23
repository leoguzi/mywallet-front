import axios from "axios";
const API_URL = "http://localhost:4000/";

function authConfig(token) {
  return {
    Anthorization: "Bearer " + token,
  };
}

function serverLogin(user) {
  return axios.post(API_URL + "login", user);
}
function activeLogout(token) {
  return axios.post(API_URL + "logout", token);
}

function registerUser(user) {
  return axios.post(API_URL + "register", user);
}

function registerEntry(token, entry) {
  console.log(authConfig(token));
  console.log(entry);
  axios.post(API_URL + "entries", entry, authConfig(token));
}

function fetchEntries(token) {
  return axios.get(API_URL + "entries", authConfig(token));
}

export { serverLogin, registerUser, activeLogout, registerEntry, fetchEntries };
