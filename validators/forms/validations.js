import { validateEmail, validateGenericText,validatePassword, validateRepeatedPassword } from "../fields/fieldsValidator.js";

export const emailValidation = [
    validateEmail,
];

export const genericTextValidation = [
    validateGenericText,
]

export const passwordValidation = [
    validatePassword,
    validateRepeatedPassword,
];