import { updatePassword } from "../../../api/profileApi.js";
import { useForm } from "../../../core/forms/form.js";
import { passwordAccountValidators } from "../../../core/validations/validators.js";

useForm({
    selector: '#passwordSecurityForm',
    validators: passwordAccountValidators,
    sendRequest: (data, options) => updatePassword(data, options),
});