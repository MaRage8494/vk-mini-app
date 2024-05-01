import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  headers: {
    'Content-Type': 'application/json',
  },
  params: { print: 'pretty' },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
