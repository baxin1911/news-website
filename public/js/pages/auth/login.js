import { validateEmail, validatePassword } from "../../utils/validations/auth.js";
import { useForm } from "../../core/form.js";
import { closeModal } from "../../utils/utils.js";
import { login } from "../../api/helpers/auth.js";

useForm({
    idForm: 'loginForm',
    validate: (data) => {

        const errors = {};

        if (!data.message) {

            errors.emailLoginInputError = validateEmail(data.email) !== null ? 'Correo incorrecto' : null;
            errors.passwordLoginInputError = validatePassword(data.password) !== null ? 'Contraseña incorrecta' : null;
        }

        return errors;
    },
    sendRequest: (data) => login(data),
    applyAfterSuccess: ({ form }) => closeModal('loginModal', form)
});