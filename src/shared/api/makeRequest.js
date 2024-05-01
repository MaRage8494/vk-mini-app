import { instance } from './axios';

export const makeRequest = async (method, url) => {
  try {
    const response = await instance({ method, url });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
