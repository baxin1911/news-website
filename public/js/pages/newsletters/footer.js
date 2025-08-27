import { validateEmail } from "../../utils/validations/auth.js";
import { useNewsletterForm } from "../../core/newsletter.js";

useNewsletterForm({
    idForm: 'newsletterFooterForm',
    validateNewsletter: (data) => {
        
        const errors = {};

        if (!data.errors) {

            errors.emailNewsletterFooterInputError = validateEmail(data.email);

        } else {
            
            errors.emailNewsletterFooterInputError = data.errors.emailNewsletterFooterInputError;
        }

        return errors;
    }
});