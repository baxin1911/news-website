const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
});

api.interceptors.response.use(
    response => response,
    error => {

        if (error.response) {

            const { data } = error.response;
            const { status } = error;
            return Promise.reject({
                status,
                data: data || null
            });

        } else if (error.request) {

            return Promise.reject({
                status: null,
                data: null
            });

        } else {

            console.log('Error inesperado:   ' + error.message);
            return Promise.reject({
                status: null,
                data: null
            });
        }
    }
);

export const apiRequest = async ({ method, url, params, data }) =>{
    try {
        const response = await api({ method, url, params, data });
        return response.data;
    } catch (error) {
        throw error;
    }
}