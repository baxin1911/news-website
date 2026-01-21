import { useForm } from "./form.js";
import { subscribeToNewsletter } from "../../api/newsletterApi.js";

export const useNewsletterForm = ({ formId }) => useForm({
    formId,
    sendRequest: (data, options) => subscribeToNewsletter(data, options),
});