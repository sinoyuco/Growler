import axios from "axios";

export const postGrowl = (growl) => {
    return axios.post('/api/growls/', growl)
}