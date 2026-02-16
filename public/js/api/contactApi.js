import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/contacts'

export const createContactRequest = (data) => apiRequest({ 
    method: 'post', 
    url: `${ route }/`, 
    data 
});