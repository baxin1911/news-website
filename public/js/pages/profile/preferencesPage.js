import { updatePreferences } from "../../api/profileApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    selector: '#preferencesForm',
    normalizeData: (form, data) => {

        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            
            data[checkbox.name] = checkbox.checked;
        });
    },
    sendRequest: (data, options) => updatePreferences(data, options)
});