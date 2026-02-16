import { recoverAccount } from "../../application/auth/recoverAccount.js";
import { useForm } from "../../application/shared/form.js";
import { recoverAuthValidators } from "../../core/validations/validators.js";
import { notifications } from "../../plugins/swal/swalComponent.js";

useForm({
    selector: '#recoverForm',
    validators: recoverAuthValidators,
    sendRequest: async ({ form, formData }) => {
        
        const data = await recoverAccount(formData);
        notifications.showSuccess(data.message);
        closeModal('recoverModal', form);
    }
});