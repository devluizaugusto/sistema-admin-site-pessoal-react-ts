import axios from 'axios';

const api = axios.create({
    baseURL: "https://json-server-node-vlgw.onrender.com",
});

export default api;