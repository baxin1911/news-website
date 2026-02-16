import { apiRequest } from "./axiosInstanceApi.js";

export const searchUsersRequest = (params) => apiRequest({ 
    method: 'get', 
    url: '/api/users', 
    params 
});