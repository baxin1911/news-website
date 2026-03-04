import { getErrorMessage } from "../../constants/errorMessages.js";
import { mapFormErrors, mapServerErrors } from "../../core/forms/mappers/formMapper.js";
import { notifications } from "../../plugins/swal/swalComponent.js";
import { toggleErrorMessages } from "../../ui/forms/formMessagesUI.js";
import { showModal } from "../../ui/modalUI.js";
import { on } from "../../utils/domUtils.js";

export const useForm = async ({ 
    selector,
    validators,
    normalizeData = () => {},
    normalizeErrors = () => {},
    sendRequest,
    onUnauthorized = (message) => {

        showModal('loginModal');
        notifications.showError(message);
    },
    normalizeServerErrors = () => {},
}) => {

    on({
        event: 'submit', 
        selector, 
        handler: async (e, form) => {

            e.preventDefault();

            let formData = Object.fromEntries(new FormData(form));

            formData = normalizeData({ form, formData });

            const errors = mapFormErrors(formData, validators);

            normalizeErrors({ form, errors });
            toggleErrorMessages(form, errors);

            const hasErrors = Object.values(errors).some(error => error);

            if (hasErrors) return;

            try {

                await sendRequest({ form, formData });

            } catch (error) {

                if (error.response.status === 400) {

                    const errors = mapServerErrors(error.response.data.errors);
                    const message = getErrorMessage(error.response.data.code);
                    
                    normalizeServerErrors(form, errors);
                    toggleErrorMessages(form, errors);
                    notifications.showError(message);

                    return;
                }

                if (error.response.status === 401) {

                    const message = getErrorMessage(error.response.data.code);
                    onUnauthorized(message);

                    return;
                }

                throw error;
            }
        }
    });
}