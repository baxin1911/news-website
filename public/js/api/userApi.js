import { apiRequest } from "./axiosInstanceApi.js";

export const searchUsers = (params, options) => apiRequest(
    { method: 'get', url: '/api/users', params },
    options
);