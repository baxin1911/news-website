import { validateEmail, validatePassword, validateRepeatedPassword } from "../fields/bodyValidator.js";

export const emailValidation = [
    validateEmail,
];

export const passwordValidation = [
    validatePassword,
    validateRepeatedPassword,
];