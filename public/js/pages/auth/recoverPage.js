import { recoverPassword } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    formId: 'recoverForm',
    modalId: 'recoverModal',
    sendRequest: (data, options) => recoverPassword(data, options),
});