import { recoverPassword } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";
import { closeModal } from "../../ui/modalUI.js";

useForm({
    idForm: 'recoverForm',
    sendRequest: (data, options) => recoverPassword(data, options),
    applyAfterSuccess: ({ form }) => closeModal('recoverModal', form)
});