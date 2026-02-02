import { useForm } from "../../core/forms/form.js";
import { login } from "../../api/authApi.js";

useForm({
    selector: '#loginForm',
    url: window.location.pathname + window.location.search,
    normalizeErrors: ({ errors }) => {

        errors.email = errors.email ? 'Correo incorrecto' : null;
        errors.password = errors.password ? 'Contraseña incorrecta' : null;

        return errors;
    },
    sendRequest: (data, options) => login(data, options),
});