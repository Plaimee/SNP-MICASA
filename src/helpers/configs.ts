import axios from 'axios';

const authRegister = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICES,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
  },
});

const authLogin = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICES,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export { authRegister, authLogin };
