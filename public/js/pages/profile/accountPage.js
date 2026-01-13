import { updateAccountInfo } from "../../api/profileApi.js";
import { useForm } from "../../core/forms/form.js";
import { initProfileFilepond } from "../../plugins/filepond/profileFilePond.js";
import { toggleFileErrors } from "../../ui/forms/formMessagesUI.js";
import { clearFileInputs } from "../../utils/formUtils.js";

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#accountForm');
    const profile = JSON.parse(document.getElementById('user-data').textContent);

    if (!form) return;

    initProfileFilepond(form, profile);
});

useForm({
    idForm: 'accountForm',
    normalizeData: (form, data) => clearFileInputs(form, data),
    normalizeErrors: ({ form, errors }) => toggleFileErrors(form, errors),
    sendRequest: (data, options) => updateAccountInfo(data, options),
    normalizeServerErrors: (form, errors) => toggleFileErrors(form, errors),
    applyAfterSuccess: () => window.location.reload()
});