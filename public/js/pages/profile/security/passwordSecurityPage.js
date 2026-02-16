import { passwordAccountValidators } from "../../../core/validations/validators.js";
import { updatePassword } from "../../../application/profile/updatePassword.js";
import { useForm } from "../../../application/shared/form.js";
import { notifications } from "../../../plugins/swal/swalComponent.js";

useForm({
    selector: '#passwordSecurityForm',
    validators: passwordAccountValidators,
    sendRequest: async ({ formData }) => {

        const data = await updatePassword(formData);
        localStorage.setItem('showSuccessToast', data.message);
        const url = '/';
        window.location.replace(url);
    },
    onUnauthorized: (message) => {
        
        window.location.replace('/');
        notifications.showError(message);
    },
});