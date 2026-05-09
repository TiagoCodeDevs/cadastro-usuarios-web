import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cadastro-usuarios-api-c5u7.onrender.com'
});

export default api;