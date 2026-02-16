import { createCommentRequest } from "../../api/commentApi.js";
import { getSuccessMessage } from "../../constants/successMessages.js";

export const createComment = async (formData) => {

    try {

        const response = await createCommentRequest(formData);
        const message = getSuccessMessage(response.data.code);

        return {
            comment: response.data.comment,
            message
        };

    } catch (error) {

        throw error;
    }
}