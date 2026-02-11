import { useForm } from "./form.js";
import { subscribeToNewsletter } from "../../api/newsletterApi.js";
import { newsletterValidators } from "../validations/validators.js";

export const useNewsletterForm = ({ formId }) => useForm({
    formId,
    validators: newsletterValidators,
    sendRequest: (data, options) => subscribeToNewsletter(data, options)
});