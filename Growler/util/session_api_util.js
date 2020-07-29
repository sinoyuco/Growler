import axios from "axios";

export const setAuthToken = (token) => {
<<<<<<< HEAD
  debugger;
  if(token){
    debugger;
    axios.defaults.headers.common['Authorization'] = token;
=======
  if (token) {
    axios.defaults.headers.common.Authorization = token;
    debugger
>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  debugger;
  return axios.post("http://192.168.1.7:5000/api/users/register", userData);
};

export const login = (userData) => {
  debugger;
  // return axios.post("http://localhost:5500/api/users/login", userData);
  return axios.post("http://192.168.1.7:5000/api/users/login", userData);
};

