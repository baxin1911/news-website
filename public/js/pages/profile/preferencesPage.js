import { useForm } from "../../application/shared/form.js";
import { updatePreferences } from "../../application/profile/updatePreferences.js";
import { preferencesValidators } from "../../core/validations/validators.js";
import { notifications } from "../../plugins/swal/swalComponent.js";

useForm({
    selector: '#preferencesForm',
    validators: preferencesValidators,
    normalizeData: ({ form, data }) => {

        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            
            data[checkbox.name] = checkbox.checked;
        });
    },
    sendRequest: async ({ formData }) => {

        const data = await updatePreferences(formData);
        localStorage.setItem('showSuccessToast', data.message);
        window.location.reload();
    },
    onUnauthorized: (message) => {
        
        window.location.replace('/');
        notifications.showError(message);
    }
});