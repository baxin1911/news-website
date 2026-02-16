import { apiRequest } from './axiosInstanceApi.js';

export const searchNewsRequest = (params) => apiRequest({ 
    method: 'get', 
    url: '/api/search', 
    params 
});