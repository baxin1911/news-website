import { validateBoolean, validateName, validateLastName, validateUsername, validateOptionalPath } from "../fields/fieldsValidator.js";

export const profileValidation = [
    validateUsername,
    validateName,
    validateLastName,
    validateOptionalPath('avatarPath'),
    validateOptionalPath('coverPath'),
]

export const preferencesValitdation = [
    validateBoolean('commentNotifications'),
    validateBoolean('followingNotifications'),
    validateBoolean('newsletterNotifications'),
];