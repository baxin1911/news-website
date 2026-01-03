import { apiRequest } from "./axiosInstanceApi.js";

export const subscribeToNewsletter = (data) => apiRequest({ method: 'post', url: '/api/newsletter/subscribe', data });