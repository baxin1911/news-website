import { apiRequest } from "./axiosInstanceApi.js";

const route = '/api/profile';

export const updateProfileRequest = (data) => apiRequest({ 
    method: 'put', 
    url: `${ route }/account`, 
    data 
});

export const updatePasswordRequest = (data) => apiRequest({ 
    method: 'patch', 
    url: `${ route }/security/password`, 
    data 
});

export const updatePreferencesRequest = (data) => apiRequest({ 
    method: 'patch', 
    url: `${ route }/preferences`, 
    data
});