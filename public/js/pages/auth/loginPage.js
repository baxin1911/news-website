import { validateEmail, validatePassword } from "../../core/validations/authValidations.js";
import { useForm } from "../../core/forms/form.js";
import { login } from "../../api/authApi.js";

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
    applyAfterSuccess: () => window.location.href = '/profile'
});