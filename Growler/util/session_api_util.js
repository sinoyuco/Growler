import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const signup = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => {
  debugger;
  // return axios.post("http://localhost:5500/api/users/login", userData);
  return axios.post("http://192.168.86.151:5000/api/users/login", userData);
};
