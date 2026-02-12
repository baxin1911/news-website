import { validateParamAction, validateParamId } from "../fields/paramValidator.js";

export const reactionValidation = [
    validateParamId,
    validateParamAction,
]