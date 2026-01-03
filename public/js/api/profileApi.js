import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/profile';

export const updateAccountInfo = (data) => apiRequest({ method: 'put', url: `${route}/account`, data });

export const updatePassword = (data) => apiRequest({ method: 'patch', url: `${route}/security/password`, data });

export const updatePreferences = (data) => apiRequest({ method: 'patch', url: `${route}/preferences`, data });