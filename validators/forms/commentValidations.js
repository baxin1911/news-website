import { validateId, validateMessage, validateOptionalId } from "../fields/fieldsValidator.js";

export const commentValidation = [
    validateMessage(2000),
    validateId('articleId'),
    validateOptionalId('parentId'),
];