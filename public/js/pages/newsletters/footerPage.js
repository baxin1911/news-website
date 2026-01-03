import { validateEmail } from "../../core/validations/authValidations.js";
import { useNewsletterForm } from "../../core/forms/newsletterForm.js";

useNewsletterForm({
    idForm: 'newsletterFooterForm',
    validateNewsletter: (data) => {
        
        const errors = {};

        if (!data.errors) {

            errors.emailNewsletterFooterInputError = validateEmail(data.email);

        } else {
            
            errors.emailNewsletterFooterInputError = data.errors.emailError;
        }

        return errors;
    }
});