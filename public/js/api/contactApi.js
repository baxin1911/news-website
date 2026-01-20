import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/contacts'

export const sendContact = (data, options) => apiRequest({ method: 'post', url: `${ route }/`, data}, options);