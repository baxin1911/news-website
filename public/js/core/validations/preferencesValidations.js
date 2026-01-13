import { isBoolean, isEmptyOrNull } from "./validations.js"

export const validateBooleanField = (value) => {

    const fieldname = 'Esta opción';
    let result = isEmptyOrNull(value, fieldname);

    if (result) return result;

    result = isBoolean(value, fieldname);

    return result;
}