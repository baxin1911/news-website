import { useForm } from "../../core/forms/form.js";
import { login } from "../../api/authApi.js";

useForm({
    idForm: 'loginForm',
    normalizeLoginError: (errors) => {

        errors.email = errors.email !== null ? 'Correo incorrecto' : null;
        errors.password = errors.password !== null ? 'Contraseña incorrecta' : null;

        return errors;
    },
    sendRequest: (data, options) => login(data, options),
    applyAfterSuccess: () => window.location.href = '/profile'
});