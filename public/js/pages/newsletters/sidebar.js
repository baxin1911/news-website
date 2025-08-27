import { validateEmail } from "../../utils/validations/auth.js";
import { useNewsletterForm } from "../../core/newsletter.js";

useNewsletterForm({
    idForm: 'newsletterSidebarForm',
    validateNewsletter: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.emailNewsletterSidebarInputError = validateEmail(data.email);

        } else {
            
            errors.emailNewsletterSidebarInputError = data.errors.emailNewsletterSidebarInputError;
        }

        return errors;
    }
});