import axios from "axios";

export const postLike = (like) => {
    debugger;
    return axios.post("http://192.168.1.7:5000/api/likes", like);
};

export const fetchGrowlLikes = (growl_id) => {
    debugger;
    return axios.get(`http://192.168.1.7:5000/api/likes/growl/${growl_id}`);
};

export const fetchUserLikes = (user_id) => {
    debugger;
    return axios.get(`http://192.168.1.7:5000/api/likes/user/${user_id}`);
};

export const deleteLike = (like_id) => {
    debugger;
    return axios.delete(`http://192.168.1.7:5000/api/likes/${like_id}`);
};