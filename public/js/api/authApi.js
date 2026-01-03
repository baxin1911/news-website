import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/auth';

export const login = (data) => apiRequest({ method: 'post', url: `${route}/login`, data });

export const register = (data) => apiRequest({ method: 'post', url: `${route}/register`, data });

export const recoverPassword = (data) => apiRequest({ method: 'post', url: `${route}/recover`, data });

export const resetPassword = (data) => apiRequest({ method: 'patch', url: `${route}/reset`, data });