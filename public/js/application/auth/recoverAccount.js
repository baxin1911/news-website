import { recoverAccountRequest } from "../../api/authApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const recoverAccount = async (formData) => {

    try {

        const response = await recoverAccountRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}