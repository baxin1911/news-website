import { useForm } from "../../core/forms/form.js";
import { login } from "../../api/authApi.js";

useForm({
    idForm: 'loginForm',
    normalizeErrors: ({ errors }) => {

        errors.email = errors.email ?? 'Correo incorrecto';
        errors.password = errors.password ?? 'Contraseña incorrecta';

        return errors;
    },
    sendRequest: (data, options) => login(data, options),
    applyAfterSuccess: () => window.location.href = '/profile'
});