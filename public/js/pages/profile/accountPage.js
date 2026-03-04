import { useForm } from "../../application/shared/form.js";
import { updateProfile } from "../../application/profile/updateProfile.js";
import { accountValidators } from "../../core/validations/validators.js";
import { clearProfileFileInputs, initProfileFilepond } from "../../plugins/filepond/profileFilePond.js";
import { toggleFileErrors } from "../../ui/forms/formMessagesUI.js";
import { notifications } from "../../plugins/swal/swalComponent.js";

const selector = '#accountForm';
const form = document.querySelector(selector);
const profile = JSON.parse(document.getElementById('user-data').textContent);

initProfileFilepond(form, profile);
useForm({
    selector,
    validators: accountValidators,
    normalizeData: ({ form, formData }) => formData = clearProfileFileInputs(form, formData),
    normalizeErrors: ({ form, errors }) => toggleFileErrors(form, errors),
    sendRequest: async ({ formData }) => {

        const data = await updateProfile(formData);
        localStorage.setItem('showSuccessToast', data.message);
        window.location.reload();
    },
    onUnauthorized: (message) => {
        
        window.location.replace('/');
        notifications.showError(message);
    },
    normalizeServerErrors: (form, errors) => toggleFileErrors(form, errors)
});