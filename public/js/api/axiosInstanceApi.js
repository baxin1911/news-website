import { handleErrorResponse, handleSuccessResponse } from "../handlers/apiResponseHandler.js";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
});

export const apiRequest = async ({ method, url, params, data }, options) =>{

    try {

        const response = await api({ method, url, params, data });

        handleSuccessResponse(response);

    } catch (error) {

        if (error.response) handleErrorResponse(error.response, options);

        throw error;
    }
}