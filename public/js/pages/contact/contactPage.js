import { sendContact } from "../../api/contactApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    idForm: 'contactForm',
    sendRequest: (data, options) => sendContact(data, options),
    applyAfterSuccess: ({ form }) => form.reset()
});