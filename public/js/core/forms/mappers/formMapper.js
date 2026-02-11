import { getErrorMessage } from "../../../constants/apiMessages.js";

export const mapServerErrors = (serverErrors) => {

    const errors = {};

    for (const field in serverErrors) {

        errors[field] = getErrorMessage(serverErrors[field]);
    }

    return errors;
}

export const mapFormErrors = (data, validators) => {

    const errors = {};

    for (const key in data) {
    
        const param = data[key];
        errors[key] = validators[key](param, data);
        
    }

    return errors;
}