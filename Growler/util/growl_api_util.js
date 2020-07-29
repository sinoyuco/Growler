import axios from "axios";

export const getGrowls = () => {
  return axios.get("http://192.168.1.7:5000/api/growls");
};

export const getUserGrowls = (id) => {
  return axios.get(`http://192.168.1.7:5000/api/growls/user/${id}`);
};

export const postGrowl = (data) => {
  debugger;
  return axios.post("http://192.168.1.7:5000/api/growls", data);
};

