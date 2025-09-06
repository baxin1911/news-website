import { useForm } from "./form.js";
import { subscribeToNewsletter } from "../api/helpers/newsletter.js";

export const useNewsletterForm = ({ idForm, validateNewsletter }) => useForm({
    idForm,
    method: 'post',
    endpoint: '/newsletter/subscribe',
    validate: (data) => validateNewsletter(data),
    sendRequest: (data) => subscribeToNewsletter(data),
    applyAfterSuccess: ({ form }) => form.reset()
});