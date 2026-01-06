import { validatecommentNotifications, validatefollowingNotifications, validateName, validateLastName, validatenewsletterNotifications, validateUsername } from "../fields/fieldsValidator.js";

export const profileValidation = [
    validateUsername,
    validateName,
    validateLastName,
]

export const preferencesValitdation = [
    validatecommentNotifications,
    validatefollowingNotifications,
    validatenewsletterNotifications,
];