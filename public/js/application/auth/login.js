import { loginRequest } from "../../api/authApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const login = async (formData) => {

    try {

        const response = await loginRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}