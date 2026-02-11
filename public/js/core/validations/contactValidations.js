import { isEmptyOrNull, isLengthInRangeMax, isString } from "./validations.js"

export const validateSubject = (subject) => {

    const fieldname = 'El asunto ';
    const allowedSubjectTypes = ['error', 'suggestion', 'news', 'collab', 'other'];
    let result = isEmptyOrNull(subject, fieldname);

    if (result) return result;

    result = isString(subject, fieldname);

    if (result) return result;

    if(!allowedSubjectTypes.includes(subject)) return 'El asunto debe ser [error, colaboración, noticias, sugerencia, otro].';

    return result;
}

export const validateMessage = ({ value, maxLength }) => {

    const fieldname = 'El texto ';
    let result = isEmptyOrNull(value, fieldname);

    if (result) return result;

    result = isString(value, fieldname);

    if (result) return result;

    result = isLengthInRangeMax(value, maxLength, fieldname);

    return result;
}