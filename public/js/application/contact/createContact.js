import { createContactRequest } from "../../api/contactApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const createContact = async (formData) => {

    try {

        const response = await createContactRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}