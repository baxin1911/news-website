import { sendContact } from "../../api/contactApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    formId: 'contactForm',
    sendRequest: (data, options) => sendContact(data, options),
});