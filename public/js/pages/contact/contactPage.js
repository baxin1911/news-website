import { createContact } from "../../api/contactApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    selector: '#contactForm',
    sendRequest: (data, options) => createContact(data, options),
});