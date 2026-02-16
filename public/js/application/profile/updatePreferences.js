import { updatePasswordRequest } from "../../api/profileApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const updatePreferences = async (formData) => {

    try {

        const response = await updatePasswordRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}