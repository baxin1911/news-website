import { useForm } from "../../application/form.js";
import { resetPassword } from "../../api/authApi.js";
import { resetAuthValidators } from "../../core/validations/validators.js";

useForm({
    selector: '#resetForm',
    validators: resetAuthValidators,
    sendRequest: (data, options) => resetPassword(data, options),
});