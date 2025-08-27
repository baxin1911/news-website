import { register } from "../../api/helpers/auth.js";
import { useForm } from "../../core/form.js";
import { closeModal } from "../../utils/utils.js";
import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "../../utils/validations/auth.js";

useForm({
    idForm: 'registerForm',
    method: 'post',
    endpoint: '/auth/register',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.emailRegisterInputError = validateEmail(data.email);
            errors.usernameRegisterInputError = validateUsername(data.username);
            errors.passwordRegisterInputError = validatePassword(data.password);
            errors.repeatedPasswordRegisterInputError = validateRepeatedPassword(data.password, data.repeatedPassword);

        } else {

            errors.emailRegisterInputError = data.errors.emailRegisterInputError;
            errors.usernameRegisterInputError = data.errors.usernameRegisterInputError;
            errors.passwordRegisterInputError = data.errors.passwordRegisterInputError;
            errors.repeatedPasswordRegisterInputError = data.errors.repeatedPasswordRegisterInputError;
        }

        return errors;
    },
    sendRequest: (data) => register(data),
    applyAfterSuccess: ({ form }) => closeModal('registerModal', form)
});