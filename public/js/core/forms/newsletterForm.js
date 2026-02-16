import { useForm } from "../../application/shared/form.js";
import { newsletterValidators } from "../validations/validators.js";
import { subscribeNewsletter } from "../../application/newsletter/subscribeNewsletter.js";
import { notifications } from "../../plugins/swal/swalComponent.js";

export const useNewsletterForm = ({ formId }) => useForm({
    formId,
    validators: newsletterValidators,
    sendRequest: async ({ form, formData }) => {

        const data = await subscribeNewsletter(formData);
        notifications.showSuccess(data.message);
        form.reset();
    }
});