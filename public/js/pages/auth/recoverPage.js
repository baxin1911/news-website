import { recoverPassword } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";
import { recoverAuthValidators } from "../../core/validations/validators.js";

useForm({
    selector: '#recoverForm',
    validators: recoverAuthValidators,
    modalId: 'recoverModal',
    sendRequest: (data, options) => recoverPassword(data, options),
});