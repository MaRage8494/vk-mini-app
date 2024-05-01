import { makeRequest } from '../../shared/api/makeRequest';

export const getComment = (id) => makeRequest('get', `item/${id}.json`);
