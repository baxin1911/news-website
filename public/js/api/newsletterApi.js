import { apiRequest } from "./axiosInstanceApi.js";

export const subscribeToNewsletter = (data, options) => apiRequest({ method: 'post', url: '/api/newsletter/subscribe', data }, options);