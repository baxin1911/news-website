import { validatePassword, validateRepeatedPassword } from "../../core/validations/authValidations.js";
import { useForm } from "../../core/forms/form.js";
import { resetPassword } from "../../api/authApi.js";

useForm({
    idForm: 'resetForm',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.passwordResetInputError = validatePassword(data.password);
            errors.repeatedPasswordResetInputError = validateRepeatedPassword(data.password, data.repeatedPassword);

        } else {

            errors.passwordResetInputError = data.errors.passwordError;
            errors.repeatedPasswordResetInputError = data.errors.repeatedPasswordError;
        }
        
        return errors;
    },
    sendRequest: (data) => resetPassword(data),
    applyAfterSuccess: () => window.location.href = '/'
});