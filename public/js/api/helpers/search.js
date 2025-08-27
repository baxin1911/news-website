import { apiRequest } from '../api.js'

export const searchNews = (params) => apiRequest({ method: 'get', url: '/search', params });
