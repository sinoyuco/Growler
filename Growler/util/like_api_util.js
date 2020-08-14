import axios from "axios";

export const postLike = (like) => {
    return axios.post("http://192.168.1.7:5000/api/likes", like);
};

export const fetchGrowlLikes = (growl_id) => {
    return axios.get(`http://192.168.1.7:5000/api/likes/growl/${growl_id}`);
};

export const fetchUserLikes = (user_id) => {
    return axios.get(`http://192.168.1.7:5000/api/likes/user/${user_id}`);
};