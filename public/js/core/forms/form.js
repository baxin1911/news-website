import { mapFormErrors, mapServerErrors } from "./mappers/formMapper.js";
import { toggleErrorMessages } from "../../ui/forms/formMessagesUI.js";
import { closeModal } from "../../ui/modalUI.js";

export const useForm = async ({ 
    formId,
    modalId = '',
    url = '/',
    normalizeData = () => {},
    normalizeErrors = () => {},
    applyBeforeRequest = () => {},
    sendRequest,
    normalizeServerErrors = () => {},
}) => {

    const form = document.getElementById(formId);

    form.addEventListener('submit', async e => {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        normalizeData(form, data);

        const errors = mapFormErrors(data);

        normalizeErrors({ form, errors });
        toggleErrorMessages(form, errors);

        const hasErrors = Object.values(errors).some(error => error);

        if (hasErrors) return;

        try {

            applyBeforeRequest(data);

            await sendRequest(data, {
                onError: {
                    showFormErrors: (serverErrors) => {

                        const errors = mapServerErrors(serverErrors);

                        normalizeServerErrors(form, errors);
                        toggleErrorMessages(form, errors);
                    }
                },
                onSuccess: {
                    resetForm: () => form.reset(),
                    closeModal: () => closeModal(modalId, form),
                    redirect: () => window.location.replace(url),
                    reload: () => window.location.reload()
                }
            });

        } catch (err) {

            console.log(err);
        }
    });
}