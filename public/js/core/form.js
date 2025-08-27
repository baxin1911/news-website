import { showSuccessMessage, showToast } from "../utils/messages.js";
import { checkStatusCodes, toggleErrorMessages } from "../utils/utils.js";

export const useForm = async ({ 
    idForm,
    validate, 
    applyBeforeRequest = () => {}, 
    sendRequest,
    applyAfterSuccess = () => {}
}) => {

    const form = document.getElementById(idForm);

    form.addEventListener('submit', async e => {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));
        let errors = validate(data);

        toggleErrorMessages(errors);

        const hasErrors = Object.values(errors).some(error => error);

        if (!hasErrors) {

            try {

                applyBeforeRequest(data);

                const response = await sendRequest(data);

                showSuccessMessage(response);
                applyAfterSuccess({ response, data, form });

            } catch (err) {

                checkStatusCodes(err, {

                    showFormErrors: (data) => {

                        showToast(data);

                        errors = validate(data);

                        toggleErrorMessages(errors);
                    }
                });
            }
        }
    });
}