import { recoverPassword } from "../../api/authApi.js";
import { useForm } from "../../core/forms/form.js";
import { closeModal } from "../../ui/modalUI.js";
import { validateEmail } from "../../core/validations/authValidations.js";

useForm({
    idForm: 'recoverForm',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.emailRecoverInputError = validateEmail(data.email);

        } else {

            errors.emailRecoverInputError = data.errors.emailError;
        }

        return errors;
    },
    sendRequest: (data) => recoverPassword(data),
    applyAfterSuccess: ({ form }) => closeModal('recoverModal', form)
});