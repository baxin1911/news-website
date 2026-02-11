import { mapFormErrors, mapServerErrors } from "./mappers/formMapper.js";
import { toggleErrorMessages } from "../../ui/forms/formMessagesUI.js";
import { closeModal } from "../../ui/modalUI.js";
import { on } from "../../utils/domUtils.js";

export const useForm = async ({ 
    selector,
    validators,
    modalId = '',
    url = '/',
    normalizeData = () => {},
    normalizeErrors = () => {},
    sendRequest,
    normalizeServerErrors = () => {},
    onSuccess = {}
}) => {

    on('submit', selector, async (e, form) => {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        normalizeData(form, data);

        const errors = mapFormErrors(data, validators);

        normalizeErrors({ form, errors });
        toggleErrorMessages(form, errors);

        const hasErrors = Object.values(errors).some(error => error);

        if (hasErrors) return;

        try {

            await sendRequest(data, {
                onError: {
                    showFormErrors: (serverErrors) => {

                        const errors = mapServerErrors(serverErrors);

                        normalizeServerErrors(form, errors);
                        toggleErrorMessages(form, errors);
                    }
                },
                onSuccess: {
                    ...onSuccess,
                    resetForm: () => form.reset(),
                    closeModal: () => closeModal(modalId, form),
                    redirect: () => window.location.replace(url),
                    reload: () => window.location.reload(),
                }
            });

        } catch (err) {

            console.log(err);
        }
    });
}