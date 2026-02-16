import { useForm } from "../../application/shared/form.js";
import { resetAuthValidators } from "../../core/validations/validators.js";
import { resetPassword } from "../../application/auth/resetPassword.js";

useForm({
    selector: '#resetForm',
    validators: resetAuthValidators,
    sendRequest: async ({ formData }) => {
        
        const data = await resetPassword(formData);
        localStorage.setItem('showSuccessToast', data.message);
        const url = '/';
        window.location.replace(url);
    }
});