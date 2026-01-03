import { updatePassword } from "../../../api/profileApi.js";
import { useForm } from "../../../core/forms/form.js";
import { validatePassword, validateRepeatedPassword } from "../../../core/validations/authValidations.js";

useForm({
    idForm: 'passwordSecurityForm',
    validate: (data) => { 
        const errors = {};
        
        if (!data.errors) {
            
            errors.passwordSecurityInputError = validatePassword(data.password);
            errors.repeatPasswordSecurityInputError = validateRepeatedPassword(data.password, data.repeatedPassword);

        } else {
            
            errors.passwordSecurityInputError = data.errors.passwordError;
            errors.repeatPasswordSecurityInputError = data.errors.repeatedPasswordError;
        }

        return errors;
    },
    sendRequest: (data) => updatePassword(data),
    applyAfterSuccess: ({ form }) => form.reset()
});