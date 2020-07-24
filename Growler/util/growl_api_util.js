import axios from "axios";

export const getGrowls = () => {
  return axios.get("/api/growls");
};

export const getUserGrowls = (id) => {
  return axios.get(`/api/growls/user/${id}`);
};

export const postGrowl = (data) => {
  return axios.post("/api/growls/", data);
};
