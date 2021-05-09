import axios from 'axios';

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    });
    return res;
}

