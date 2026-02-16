import { searchNewsRequest } from "../../api/searchApi.js";
import { getInfoMessage } from "../../constants/infoMessages.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

 export const searchNews = async (formData) => {

    try {

        const response = await searchNewsRequest(formData);
        const { data } = response;
        let message = getSuccessMessage(data.code);
        let messageType = 'success';

        if (!message) {

            message = getInfoMessage(data.code);
            messageType = 'info';
        }

        return {
            articles: data.articles,
            q: data.q,
            pagination: data.pagination,
            message,
            messageType
        };

    } catch (error) {

        throw error;
    }
 }