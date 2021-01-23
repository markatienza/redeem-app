import axios from 'axios';

axios.defaults.baseURL = process.env.REQUEST_URL || '/api/v1'

export default axios;