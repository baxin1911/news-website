import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/auth';

export const login = (data, options) => apiRequest(
    { method: 'post', url: `${ route }/login`, data }, 
    options
);

export const register = (data, options) => apiRequest(
    { method: 'post', url: `${ route }/register`, data }, 
    options
);

export const recoverPassword = (data, options) => apiRequest(
    { method: 'post', url: `${ route }/recover`, data }, 
    options
);

export const resetPassword = (data, options) => apiRequest(
    { method: 'patch', url: `${ route }/reset`, data }, 
    options
);