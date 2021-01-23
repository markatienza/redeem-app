import axios from 'axios';
import { getToken } from '../helpers/token'
axios.defaults.baseURL = process.env.REQUEST_URL || '/api/v1';

axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;