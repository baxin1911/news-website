import { isBoolean } from "../validationsUtils.js"

export const validateBooleanField = (value) => isBoolean(value, 'El valor');