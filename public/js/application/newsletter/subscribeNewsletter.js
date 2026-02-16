import { subscribeNewsletterRequest } from "../../api/newsletterApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const subscribeNewsletter = async (formData) => {

    try {

        const response = await subscribeNewsletterRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}