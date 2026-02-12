
import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "../fields/bodyValidator.js";


export const loginValidation = [
    validateEmail,
    validatePassword,
]

export const authRegisterValidation = [
    validateEmail,
    validateUsername,
    validatePassword,
    validateRepeatedPassword,
];