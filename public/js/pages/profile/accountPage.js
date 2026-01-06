import { updateAccountInfo } from "../../api/profileApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    idForm: 'accountForm',
    sendRequest: (data, options) => updateAccountInfo(data, options),
    applyAfterSuccess: () => window.location.reload()
});