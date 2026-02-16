import { registerAccount } from "../../application/auth/registerAccount.js";
import { useForm } from "../../application/shared/form.js";
import { registerAuthValidators } from "../../core/validations/validators.js";
import { notifications } from "../../plugins/swal/swalComponent.js";
import { closeModal } from "../../ui/modalUI.js";

useForm({
    selector: '#registerForm',
    validators: registerAuthValidators,
    sendRequest: async ({ form, formData }) => {

        const data = await registerAccount(formData);
        closeModal('registerModal', form);
        notifications.showSuccess(data.message);
    }
});