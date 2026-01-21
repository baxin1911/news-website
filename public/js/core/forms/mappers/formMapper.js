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

    for (const key in data) {
    
        const param = data[key];
        errors[key] = validators[key](param, data);
        
    }

    return errors;
}