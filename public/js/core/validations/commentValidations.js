import { isEmptyOrNull, isString } from "./validations.js";

export const validateUUID = ({ value, isOptional }) => {

    const fieldname = 'El campo';

    if (isOptional === 'optional' && !value) return null;

    let result = isEmptyOrNull(value, fieldname);

    if (result) return result;

    result = isString(value, fieldname);

    if (result) return result;

    const uuidRegex = 
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(value)) return `${fieldname} no tiene un formato válido.`;

    return null;
}