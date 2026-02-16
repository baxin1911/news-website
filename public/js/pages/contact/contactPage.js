import { createContact } from "../../application/contact/createContact.js";
import { useForm } from "../../application/shared/form.js";
import { contactValidators } from "../../core/validations/validators.js";
import { notifications } from "../../plugins/swal/swalComponent.js";

useForm({
    selector: '#contactForm',
    validators: contactValidators,
    sendRequest: async ({ form, formData }) => {
        
        const data = await createContact(formData);
        notifications.showSuccess(data.message);
        form.reset();
    }
});