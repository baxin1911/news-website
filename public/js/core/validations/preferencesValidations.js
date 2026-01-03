import { isBoolean, isEmptyOrNull } from "./validations.js"

export const validateBooleanField = (value) => {
    
    let result = isEmptyOrNull(value, 'Esta opción');

    if (result) return result;

    result = isBoolean(value, 'Esta opción');

    return result;
}