import { updateAccountInfo } from "../../api/profileApi.js";
import { useForm } from "../../core/forms/form.js";
import { accountValidators } from "../../core/validations/validators.js";
import { initProfileFilepond } from "../../plugins/filepond/profileFilePond.js";
import { toggleFileErrors } from "../../ui/forms/formMessagesUI.js";
import { clearFileInputs } from "../../utils/formUtils.js";

const selector = '#accountForm';
const form = document.querySelector(selector);
const profile = JSON.parse(document.getElementById('user-data').textContent);

initProfileFilepond(form, profile);
useForm({
    selector,
    validators: accountValidators,
    normalizeData: (form, data) => clearFileInputs(form, data),
    normalizeErrors: ({ form, errors }) => toggleFileErrors(form, errors),
    sendRequest: (data, options) => updateAccountInfo(data, options),
    normalizeServerErrors: (form, errors) => toggleFileErrors(form, errors),
});