import { makeRequest } from '../../shared/api/makeRequest';

export const getAllNews = () => makeRequest('get', `newstories.json`);
