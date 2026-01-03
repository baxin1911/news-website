import { checkErrorStatusCodes, checkSuccessStatusCodes } from "../httpStatus.js";
import { toggleErrorMessages } from "../../ui/swalUI.js";

export const useForm = async ({ 
    idForm,
    normalizeCheckboxData = () => {},
    validate,
    applyBeforeRequest = () => {},
    sendRequest,
    applyAfterSuccess = () => {}
}) => {

    const form = document.getElementById(idForm);

    form.addEventListener('submit', async e => {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        normalizeCheckboxData(form, data);

        let errors = validate(data);

        toggleErrorMessages(form, errors);

        const hasErrors = Object.values(errors).some(error => error);

        if (hasErrors) return;

        try {

            applyBeforeRequest(data);

            const response = await sendRequest(data);

            checkSuccessStatusCodes(response);
            applyAfterSuccess({ data, form });

        } catch (err) {

            checkErrorStatusCodes(err, {

                showFormErrors: (data) => {

                    errors = validate(data);

                    toggleErrorMessages(form, errors);
                }
            });
        }
    });
}