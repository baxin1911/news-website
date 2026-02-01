import { updateAccountInfo } from "../../api/profileApi.js";
import { useForm } from "../../core/forms/form.js";
import { initProfileFilepond } from "../../plugins/filepond/profileFilePond.js";
import { toggleFileErrors } from "../../ui/forms/formMessagesUI.js";
import { clearFileInputs } from "../../utils/formUtils.js";

const selector = '#accountForm';
const form = document.querySelector(selector);
const profile = JSON.parse(document.getElementById('user-data').textContent);

if (!form) return;

initProfileFilepond(form, profile);

useForm({
    selector,
    normalizeData: (form, data) => clearFileInputs(form, data),
    normalizeErrors: ({ form, errors }) => toggleFileErrors(form, errors),
    sendRequest: (data, options) => updateAccountInfo(data, options),
    normalizeServerErrors: (form, errors) => toggleFileErrors(form, errors),
});