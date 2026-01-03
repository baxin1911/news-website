import { register } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";
import { closeModal } from "../../ui/modalUI.js";
import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "../../core/validations/authValidations.js";

useForm({
    idForm: 'registerForm',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.emailRegisterInputError = validateEmail(data.email);
            errors.passwordRegisterInputError = validatePassword(data.password);
            errors.repeatedPasswordRegisterInputError = validateRepeatedPassword(data.password, data.repeatedPassword);
            errors.usernameRegisterInputError = validateUsername(data.username);

        } else {

            errors.emailRegisterInputError = data.errors.emailError;
            errors.passwordRegisterInputError = data.errors.passwordError;
            errors.repeatedPasswordRegisterInputError = data.errors.repeatedPasswordError;
            errors.usernameRegisterInputError = data.errors.usernameError;
        }

        return errors;
    },
    sendRequest: (data) => register(data),
    applyAfterSuccess: ({ form }) => closeModal('registerModal', form)
});