import { includeSpace, includeUppercase, isEmptyOrNull, isLengthInRangeMax, isLengthInRangeMin, isRegex, isString } from "../validationsUtils.js";

export const validateName = (name) => {

    const regex = /^[a-zA-Z\s]+$/;
    const fieldName = 'El nombre';
    const result = isEmptyOrNull(name, fieldName);

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
    const result = isEmptyOrNull(lastname, fieldName);

    if (result) return result;

    result = isString(lastname, fieldName);

    if (result) return result;

    if (!regex.test(lastname)) return 'El apellido debe tener solo letras, numeros y guiones bajos';

    result = isLengthInRangeMin(lastname, 3, fieldName);

    if (result) return result;

    result = isLengthInRangeMax(lastname, 100, fieldName);

    return result;
}