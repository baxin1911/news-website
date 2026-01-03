import { validateEmail } from "../../core/validations/authValidations.js";
import { useNewsletterForm } from "../../core/forms/newsletterForm.js";

useNewsletterForm({
    idForm: 'newsletterSidebarForm',
    validateNewsletter: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.emailNewsletterSidebarInputError = validateEmail(data.email);

        } else {
            
            errors.emailNewsletterSidebarInputError = data.errors.emailError;
        }

        return errors;
    }
});