import { apiRequest } from './axiosInstanceApi.js'

export const searchNews = (params) => apiRequest({ method: 'get', url: '/search', params });
