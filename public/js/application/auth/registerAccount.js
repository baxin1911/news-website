import { registerRequest } from "../../api/authApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const registerAccount = async (formData) => {

    try {
    
        const response = await registerRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}