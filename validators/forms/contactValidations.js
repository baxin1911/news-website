import { validateEmail, validateMessage, validateName, validateSubject } from "../fields/fieldsValidator.js";

export const contactValidation = [
    validateName,
    validateEmail,
    validateSubject,
    validateMessage(500)
]