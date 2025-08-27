import { apiRequest } from "../api.js";

export const subscribeToNewsletter = (data) => apiRequest({ method: 'post', url: '/newsletter/subscribe', data });