import { validateDisplayName, validateLastName, validateName } from "../../core/validations/profileValidations.js";
import { updateAccountInfo } from "../../api/profileApi.js";
import { useForm } from "../../core/forms/form.js";

useForm({
    idForm: 'accountForm',
    validate: (data) => { 
        const errors = {};

        if (!data.errors) {

            errors.textDisplayNameAccountInputError = validateDisplayName(data.displayName);
            errors.nameAccountInputError = validateName(data.name);
            errors.lastNameAccountInputError = validateLastName(data.lastName);
            errors.fileProfilePictureAccountInputError = null;
            errors.fileCoverPictureAccountInputError = null;

        } else {

            errors.textDisplayNameAccountInputError = data.errors.displayNameError;
            errors.nameAccountInputError = data.errors.nameError;
            errors.lastNameAccountInputError = data.errors.lastNameError;
            errors.fileProfilePictureAccountInputError = data.errors.profilePictureError;
            errors.fileCoverPictureAccountInputError = data.errors.coverPictureError;
        }

        return errors;
    },
    sendRequest: (data) => updateAccountInfo(data),
    applyAfterSuccess: () => window.location.reload()
});