import { updateProfileRequest } from "../../api/profileApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const updateProfile = async (formData) =>  {

    try {

        const response = await updateProfileRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            message
        };

    } catch (error) {

        throw error;
    }
}