import { includeSpace, includeUppercase, isEmptyOrNull, isLengthInRangeMax, isLengthInRangeMin, isRegex, isString } from "./validations.js";

export const validateEmail = (email) => {

    const regex = /\S+@\S+\.\S+/;
    const fieldName = 'El correo';
    let result = isEmptyOrNull(email, fieldName);

    if (result) return result;

    result = isString(email, fieldName);

    if (result) return result;

    result = includeSpace(email, fieldName);

    if (result) return result;

    result = isRegex(email, regex, fieldName);

    if (result) return result;

    result = isLengthInRangeMin(email, 10, fieldName);

    if (result) return result;

    result = isLengthInRangeMax(email, 100, fieldName);

    return result;
}

export const validatePassword = (password) => {

    const regex = /^[A-Za-z0-9!@#\$%\^&\*]+$/;
    const fieldName = 'La contraseña';
    let result = isEmptyOrNull(password, fieldName);

    if (result) return result;

    result = isString(password, fieldName);

    if (result) return result;

    result = includeSpace(password, fieldName);

    if (result) return result;

    result = includeUppercase(password, fieldName);

    if (result) return result;

    if (!regex.test(password)) return 'La contraseña debe tener al menos una numero y símbolo especial';

    result = isLengthInRangeMin(password, 8, fieldName);

    if (result) return result;

    result = isLengthInRangeMax(password, 100, fieldName);

    return result;
}

export const validateRepeatedPassword = (password, repeatedPassword) => {

    if (repeatedPassword !== password) return 'La contraseña no coincide';

    return null;
}

export const validateUsername = (displayName) => {

    const regex = /\w+/;
    const fieldName = 'El nombre de usuario';
    let result = isEmptyOrNull(displayName, fieldName);

    if (result) return result;

    result = isString(displayName, fieldName);

    if (result) return result;

    result = includeSpace(displayName, fieldName);

    if (result) return result;

    result = includeUppercase(displayName, fieldName);

    if (result) return result;

    if (!regex.test(displayName)) return 'El nombre de usuario debe tener solo letras, numeros y guiones bajos';
    
    result = isLengthInRangeMax(displayName, 100, fieldName);

    if (result) return result;

    result = isLengthInRangeMin(displayName, 3, fieldName);

    return result;
}