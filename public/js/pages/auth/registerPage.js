import { register } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    formId: 'registerForm',
    modalId: 'registerModal',
    sendRequest: (data, options) => register(data, options),
});