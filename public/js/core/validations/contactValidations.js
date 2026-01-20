import { isEmptyOrNull, isLengthInRangeMax, isLengthInRangeMin, isString } from "./validations.js"

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

export const validateMessage = (subject) => {

    const fieldname = 'El texto ';
    let result = isEmptyOrNull(subject, fieldname);

    if (result) return result;

    result = isString(subject, fieldname);

    if (result) return result;

    result = isLengthInRangeMin(subject, 1, fieldname);

    if (result) return result;

    result = isLengthInRangeMax(subject, 500, fieldname);

    return result;
}