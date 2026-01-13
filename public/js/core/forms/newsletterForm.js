import { useForm } from "./form.js";
import { subscribeToNewsletter } from "../../api/newsletterApi.js";

export const useNewsletterForm = ({ idForm }) => useForm({
    idForm,
    sendRequest: (data, options) => subscribeToNewsletter(data, options),
    applyAfterSuccess: ({ form }) => form.reset()
});