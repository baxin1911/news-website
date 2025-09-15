import { validatePassword, validateRepeatedPassword } from "../../utils/validations/auth.js";
import { useForm } from "../../core/form.js";
import { resetPassword } from "../../api/helpers/auth.js";

useForm({
    idForm: 'resetForm',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.passwordResetInputError = validatePassword(data.password);
            errors.repeatedPasswordResetInputError = validateRepeatedPassword(data.password, data.repeatedPassword);

        } else {

            errors.passwordResetInputError = data.errors.passwordResetInputError;
            errors.repeatedPasswordResetInputError = data.errors.repeatedPasswordResetInputError;
        }
        
        return errors;
    },
    sendRequest: (data) => resetPassword(data),
    applyAfterSuccess: () => window.location.href = '/'
});