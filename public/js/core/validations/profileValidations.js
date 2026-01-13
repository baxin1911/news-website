import { isEmptyOrNull, isLengthInRangeMax, isLengthInRangeMin, isString } from "./validations.js";

export const validateText = (name, fieldName) => {

    const allowedName = /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u;
    let result = isEmptyOrNull(name, fieldName);

    if (result) return result;

    result = isString(name, fieldName);

    if (result) return result;

    if (!allowedName.test(name)) return `${ fieldName } debe tener solo letras y caracteres válidos.`;

    result = isLengthInRangeMin(name, 3, fieldName);

    if (result) return result;

    result = isLengthInRangeMax(name, 100, fieldName);

    return result;
}

export const validateAvatarPath = (path) => {

    if (!path) return;

    const fieldName = 'La ruta del avatar';
    const allowedPath = /^\/(avatars|temp)\/[\w\-]+\.(jpg|png|webp)$/i;
    let result = isString(path, fieldName);

    if (result) return result;

    if (!allowedPath.test(path)) return `${ fieldName } debe ser una ruta válida.`;

    return result;
}

export const validateCoverPath = (path) => {

    if (!path) return;

    const fieldName = 'La ruta de la portada';
    const allowedPath = /^\/(covers|temp)\/[\w\-]+\.(jpg|png|webp)$/i;
    let result = isString(path, fieldName);

    if (result) return result;

    if (!allowedPath.test(path)) return `${ fieldName } debe ser una ruta válida.`;

    return result;
}

export const validateName = (name) => validateText(name, 'El nombre');

export const validateLastName = (lastname) => validateText(lastname, 'El apellido');