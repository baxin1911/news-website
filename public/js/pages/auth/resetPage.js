import { useForm } from "../../core/forms/form.js";
import { resetPassword } from "../../api/authApi.js";

useForm({
    idForm: 'resetForm',
    sendRequest: (data, options) => resetPassword(data, options),
    applyAfterSuccess: () => window.location.href = '/'
});