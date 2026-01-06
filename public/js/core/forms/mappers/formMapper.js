import { getErrorMessage } from "../../../constants/apiMessages.js";
import { validators } from "../../validations/validators.js";

export const mapServerErrors = (serverErrors) => {

    const errors = {};

    for (const field in serverErrors) {

        errors[field] = getErrorMessage(serverErrors[field]);
    }

    return errors;
}

export const mapFormErrors = (data) => {

    const errors = {};

    for (const field in validators) {
    
        errors[field] = validators[field](data[field]);
    }

    return errors;
}