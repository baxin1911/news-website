import { apiRequest } from './axiosInstanceApi.js';

export const searchNews = (params, options) => apiRequest(
    { method: 'get', url: '/search', params }, 
    options
);
