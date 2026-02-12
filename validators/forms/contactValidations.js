import { validateEmail, validateMessage, validateName, validateSubject } from "../fields/bodyValidator.js";

export const contactValidation = [
    validateName,
    validateEmail,
    validateSubject,
    validateMessage(500)
]