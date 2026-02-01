import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/articles';

export const activateArticleAction = (data, options) => apiRequest(
    { method: 'post', url: `${ route }/${ data.id }/${ data.action }`, data }, 
    options
);