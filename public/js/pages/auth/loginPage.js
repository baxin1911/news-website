import { useForm } from "../../application/shared/form.js";
import { loginValidators } from "../../core/validations/validators.js";
import { login } from "../../application/auth/login.js";

useForm({
    selector: '#loginForm',
    validators: loginValidators,
    normalizeErrors: ({ errors }) => {

        errors.email = errors.email ? 'Correo incorrecto' : null;
        errors.password = errors.password ? 'Contraseña incorrecta' : null;

        return errors;
    },
    sendRequest: async ({ formData }) => {

        const data = await login(formData);
        localStorage.setItem('showSuccessToast', data.message);
        const url = window.location.pathname + window.location.search;
        window.location.replace(url);
    }
});