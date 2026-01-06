import { register } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";
import { closeModal } from "../../ui/modalUI.js";

useForm({
    idForm: 'registerForm',
    sendRequest: (data, options) => register(data, options),
    applyAfterSuccess: ({ form }) => closeModal('registerModal', form)
});