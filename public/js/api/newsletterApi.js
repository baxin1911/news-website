import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/newsletters';

export const subscribeNewsletterRequest = (data) => apiRequest({ 
    method: 'post', 
    url: `${ route }/subscribe`, 
    data 
});