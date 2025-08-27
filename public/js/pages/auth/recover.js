import { recoverPassword } from "../../api/helpers/auth.js";
import { useForm } from "../../core/form.js";
import { closeModal } from "../../utils/utils.js";
import { validateEmail } from "../../utils/validations/auth.js";

useForm({
    idForm: 'recoverForm',
    method: 'post',
    endpoint: '/auth/recover',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.emailRecoverInputError = validateEmail(data.email);

        } else {

            errors.emailRecoverInputError = data.errors.emailRecoverInputError;
        }

        return errors;
    },
    sendRequest: (data) => recoverPassword(data),
    applyAfterSuccess: ({ form }) => closeModal('recoverModal', form)
});