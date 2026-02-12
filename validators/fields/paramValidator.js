import { param } from "express-validator";
import { errorCodeMessages } from "../../messages/codeMessages.js";

export const validateParamId =
    param('id')
        .notEmpty().withMessage(errorCodeMessages.EMPTY_ID)
        .isUUID('4').withMessage(errorCodeMessages.ID_NOT_UUID)
;

export const validateParamAction =
    param('action')
        .notEmpty().withMessage(errorCodeMessages.INVALID_ACTION)
;