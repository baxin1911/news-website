import { resetPasswordRequest } from "../../api/authApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const resetPassword = async (formData) => {

    try {

        const response = await resetPasswordRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}