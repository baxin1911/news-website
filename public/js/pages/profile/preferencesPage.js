import { updatePreferences } from "../../api/profileApi.js";
import { validateBooleanField } from "../../core/validations/preferencesValidations.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    idForm: 'preferencesForm',
    normalizeCheckboxData: (form, data) => {
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            data[checkbox.name] = checkbox.checked;
        });
    },
    validate: (data) => { 
        const errors = {};
        
        if (!data.errors) {
            
            errors.commentNotificationsSwitchError = validateBooleanField(data.commentNotifications);
            errors.followingNotificationsSwitchError = validateBooleanField(data.followingNotifications);
            errors.newsletterNotificationsSwitchError = validateBooleanField(data.newsletterNotifications);

        } else {
            
            errors.commentNotificationsSwitchError = data.errors.commentNotificationsError;
            errors.followingNotificationsSwitchError = data.errors.followingNotificationsError;
            errors.newsletterNotificationsSwitchError = data.errors.newsletterNotificationsError;
        }

        return errors;
    },
    sendRequest: (data) => updatePreferences(data)
});