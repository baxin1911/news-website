import { validateId, validateMessage, validateOptionalId } from "../fields/bodyValidator.js";

export const commentValidation = [
    validateMessage(2000),
    validateId('articleId'),
    validateOptionalId('parentId'),
];