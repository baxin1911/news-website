import { includeSpace, includeUppercase, isEmptyOrNull, isLengthInRangeMax, isLengthInRangeMin, isString } from "./validations.js";

export const validateDisplayName = (displayName) => {

    const regex = /\w+/;
    const fieldName = 'El nombre público';
    let result = isEmptyOrNull(displayName, fieldName);

    if (result) return result;

    result = isString(displayName, fieldName);

    if (result) return result;

    result = includeSpace(displayName, fieldName);

    if (result) return result;

    result = includeUppercase(displayName, fieldName);

    if (result) return result;

    if (!regex.test(displayName)) return 'El nombre público debe tener solo letras, numeros y guiones bajos';
    
    result = isLengthInRangeMax(displayName, 100, fieldName);

    if (result) return result;

    result = isLengthInRangeMin(displayName, 3, fieldName);

    return result;
}

export const validateName = (name) => {

    const regex = /^[a-zA-Z\s]+$/;
    const fieldName = 'El nombre';
    let result = isEmptyOrNull(name, fieldName);

    if (result) return result;

    result = isString(name, fieldName);
    if (result) return result;

    if (!regex.test(name)) return 'El nombre debe tener solo letras, numeros y guiones bajos';

    result = isLengthInRangeMin(name, 3, fieldName);

    if (result) return result;

    result = isLengthInRangeMax(name, 100, fieldName);

    return result;
}

export const validateLastName = (lastname) => {

    const regex = /^[a-zA-Z\s]+$/;
    const fieldName = 'El apellido';
    let result = isEmptyOrNull(lastname, fieldName);

    if (result) return result;

    result = isString(lastname, fieldName);

    if (result) return result;

    if (!regex.test(lastname)) return 'El apellido debe tener solo letras, numeros y guiones bajos';

    result = isLengthInRangeMin(lastname, 3, fieldName);

    if (result) return result;

    result = isLengthInRangeMax(lastname, 100, fieldName);

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

    return result;
}