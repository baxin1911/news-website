import { updatePassword } from "../../../api/profileApi.js";
import { useForm } from "../../../core/forms/form.js";

useForm({
    idForm: 'passwordSecurityForm',
    sendRequest: (data, options) => updatePassword(data, options),
    applyAfterSuccess: ({ form }) => form.reset()
});