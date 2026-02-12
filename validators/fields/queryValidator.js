import { query } from "express-validator";
import { errorCodeMessages } from "../../messages/codeMessages.js";

export const validateGenericText = 
    query('q')
        .trim()
        .notEmpty().withMessage(errorCodeMessages.EMPTY_TEXT)
        .isString().withMessage(errorCodeMessages.TEXT_NOT_STRING)
        .isLength({ max: 200 }).withMessage(errorCodeMessages.TEXT_TOO_LONG)
;