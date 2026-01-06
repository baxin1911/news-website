import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "./authValidations.js";

export const validators = {
    email: validateEmail,
    password: validatePassword,
    repeatedPassword: validateRepeatedPassword,
    username: validateUsername
}