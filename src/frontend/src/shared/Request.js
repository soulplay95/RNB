import axios from 'axios';

const instance = axios.create({
    baseURL:'' //서버주소
});

export default instance;