import { makeRequest } from '../../shared/api/makeRequest';

export const getNews = (id) => makeRequest('get', `item/${id}.json`);
