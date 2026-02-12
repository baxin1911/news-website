import { updatePreferences } from "../../api/profileApi.js";
import { useForm } from "../../application/form.js";
import { preferencesValidators } from "../../core/validations/validators.js";

useForm({
    selector: '#preferencesForm',
    validators: preferencesValidators,
    normalizeData: (form, data) => {

        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            
            data[checkbox.name] = checkbox.checked;
        });
    },
    sendRequest: (data, options) => updatePreferences(data, options)
});