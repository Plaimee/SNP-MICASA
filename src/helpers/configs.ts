import axios from 'axios';

const gateway = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICES,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export { gateway };
