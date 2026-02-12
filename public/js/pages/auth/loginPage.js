import { useForm } from "../../application/form.js";
import { login } from "../../api/authApi.js";
import { loginValidators } from "../../core/validations/validators.js";

useForm({
    selector: '#loginForm',
    validators: loginValidators,
    url: window.location.pathname + window.location.search,
    normalizeErrors: ({ errors }) => {

        errors.email = errors.email ? 'Correo incorrecto' : null;
        errors.password = errors.password ? 'Contraseña incorrecta' : null;

        return errors;
    },
    sendRequest: (data, options) => login(data, options),
});