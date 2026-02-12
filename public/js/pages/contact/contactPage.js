import { createContact } from "../../api/contactApi.js";
import { useForm } from "../../application/form.js";
import { contactValidators } from "../../core/validations/validators.js";

useForm({
    selector: '#contactForm',
    validators: contactValidators,
    sendRequest: (data, options) => createContact(data, options),
});