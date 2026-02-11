import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "./authValidations.js";
import { validateUUID } from "./commentValidations.js";
import { validateMessage, validateSubject } from "./contactValidations.js";
import { validateBooleanField } from "./preferencesValidations.js";
import { validateAvatarPath, validateCoverPath, validateLastName, validateName } from "./profileValidations.js";
import { validateQuery } from "./searchValidations.js";

export const newsletterValidators = {
    email: validateEmail
};

export const recoverAuthValidators = {
    email: validateEmail
};

export const searchValidators = {
    q: validateQuery
};

export const articleCommentValidators = {
    message: (value, data) => validateMessage({ value, maxLength: 2000 }),
    parentId: (value, data) => validateUUID({ value, isOptional: 'optional' }),
    articleId: (value, data) => validateUUID({ value, isOptional: 'required' })
};

export const loginValidators = {
    email: validateEmail,
    password: validatePassword
};

export const registerAuthValidators = {
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    repeatedPassword: (value, data) => validateRepeatedPassword(value, data.password)
};

export const resetAuthValidators = {
    password: validatePassword,
    repeatedPassword: (value, data) => validateRepeatedPassword(value, data.password)
};

export const passwordAccountValidators = {
    password: validatePassword,
    repeatedPassword: (value, data) => validateRepeatedPassword(value, data.password)
};

export const contactValidators = {
    email: validateEmail,
    name: validateName,
    subject: validateSubject,
    message: (value, data) => validateMessage({ value, maxLength: 500 })
};

export const accountValidators = {
    username: validateUsername,
    avatarPath: validateAvatarPath,
    coverPath: validateCoverPath,
    name: validateName,
    lastName: validateLastName
};

export const preferencesValidators = {
    commentNotifications: validateBooleanField,
    followingNotifications: validateBooleanField,
    newsletterNotifications: validateBooleanField
};