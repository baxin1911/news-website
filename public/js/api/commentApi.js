import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/comments';

export const handleActionCommentRequest = (data) => apiRequest({ 
    method: 'post', 
    url: `${ route }/${ data.id }/${ data.action }`, 
    data 
});

export const createCommentRequest = (data) => apiRequest({ 
    method: 'post', 
    url: `${ route }/`, 
    data 
});