import axios from "axios";
const API_URL = "http://localhost:4000/";

function serverLogin(user) {
  return axios.post(API_URL + "login", user);
}
function activeLogout(token) {
  return axios.post(API_URL + "logout", token);
}

function registerUser(user) {
  return axios.post(API_URL + "register", user);
}

export { serverLogin, registerUser, activeLogout };
