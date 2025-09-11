import { apiRequest } from "../api.js";

const auth = '/auth';

export const login = (data) => apiRequest({ method: 'post', url: `${auth}/login`, data });

export const register = (data) => apiRequest({ method: 'post', url: `${auth}/register`, data });

export const recoverPassword = (data) => apiRequest({ method: 'post', url: `${auth}/recover`, data });

export const resetPassword = (data) => apiRequest({ method: 'post', url: `${auth}/reset`, data });