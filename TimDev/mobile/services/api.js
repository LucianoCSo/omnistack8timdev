import Axios from 'axios';

const api = Axios.create({
    baseURL: "http://localhost:3331",
})

export default api;