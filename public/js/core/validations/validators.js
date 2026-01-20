import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "./authValidations.js";
import { validateMessage, validateSubject } from "./contactValidations.js";
import { validateBooleanField } from "./preferencesValidations.js";
import { validateAvatarPath, validateCoverPath, validateLastName, validateName } from "./profileValidations.js";
import { validateQuery } from "./searchValidations.js";

export const validators = {
    name: validateName,
    lastName: validateLastName,
    email: validateEmail,
    password: validatePassword,
    repeatedPassword: validateRepeatedPassword,
    username: validateUsername,
    commentNotifications: validateBooleanField,
    followingNotifications: validateBooleanField,
    newsletterNotifications: validateBooleanField,
    coverPath: validateCoverPath,
    avatarPath: validateAvatarPath,
    q: validateQuery,
    subject: validateSubject,
    message: validateMessage
}