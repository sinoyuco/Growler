import axios from "axios";

export const getGrowls = () => {
  return axios.get("/api/growls");
};

export const getUserGrowls = (id) => {
  return axios.get(`/api/growls/user/${id}`);
};

export const postGrowl = (data) => {
  debugger
 return axios.post('http://192.168.1.7:5000/api/growls/growl', data);
  // return axios.post({"https://localhost:5000/api/growls/", data});

};

