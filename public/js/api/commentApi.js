import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/comments';

export const activateCommentAction = (data, options) => apiRequest(
    { method: 'post', url: `${ route }/${ data.id }/${ data.action }`, data }, 
    options
);

export const sendComment = (data, options) => apiRequest(
    { method: 'post', url: `${ route }/`, data },
    options
);