import { updatePassword } from "../../../api/profileApi.js";
import { useForm } from "../../../core/forms/form.js";

useForm({
    formId: 'passwordSecurityForm',
    sendRequest: (data, options) => updatePassword(data, options),
});