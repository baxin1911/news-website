import { register } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";
import { registerAuthValidators } from "../../core/validations/validators.js";

useForm({
    selector: '#registerForm',
    validators: registerAuthValidators,
    modalId: 'registerModal',
    sendRequest: (data, options) => register(data, options),
});