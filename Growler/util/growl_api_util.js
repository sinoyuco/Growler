import axios from "axios";

export const getGrowls = () => {
  return axios.get("http://192.168.1.7:5000/api/growls");
};

export const getUserGrowls = (id) => {
  return axios.get(`http://192.168.1.7:5000/api/growls/user/${id}`);
};

export const postGrowl = (data) => {
<<<<<<< HEAD
  debugger;
  return axios.post("http://192.168.1.7:5000/api/growls", data);
=======
  debugger
 return axios.post('http://192.168.1.7:5000/api/growls/growl', data);
  // return axios.post({"https://localhost:5000/api/growls/", data});

>>>>>>> ed2c21fff2f7fdbd7eb359393caf1133e54758ab
};

