import { mapFormErrors, mapServerErrors } from "./mappers/formMapper.js";
import { toggleErrorMessages } from "../../ui/forms/formMessagesUI.js";

export const useForm = async ({ 
    idForm,
    normalizeCheckboxData = () => {},
    normalizeLoginError = () => {},
    applyBeforeRequest = () => {},
    sendRequest,
    applyAfterSuccess = () => {}
}) => {

    const form = document.getElementById(idForm);

    form.addEventListener('submit', async e => {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        normalizeCheckboxData(form, data);

        const errors = mapFormErrors(data);

        normalizeLoginError(errors);
        toggleErrorMessages(form, errors);

        const hasErrors = Object.values(errors).some(error => error);

        if (hasErrors) return;

        try {

            applyBeforeRequest(data);

            await sendRequest(data, {

                showFormErrors: (serverErrors) => {

                    const errors = mapServerErrors(serverErrors);

                    toggleErrorMessages(form, errors);
                }
            });

            applyAfterSuccess({ data, form });

        } catch (err) {

            console.log(err);
        }
    });
}