import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/articles';

export const handleActionArticleRequest = (data) => apiRequest({ 
    method: 'post', 
    url: `${ route }/${ data.id }/${ data.action }`, 
    data 
});