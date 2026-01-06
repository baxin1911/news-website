import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/profile';

export const updateAccountInfo = (data, options) => apiRequest({ method: 'put', url: `${route}/account`, data }, options);

export const updatePassword = (data, options) => apiRequest({ method: 'patch', url: `${route}/security/password`, data }, options);

export const updatePreferences = (data, options) => apiRequest({ method: 'patch', url: `${route}/preferences`, data }, options);