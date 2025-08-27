import { validateEmail } from "../helpers/validations/auth.js";

export const subscribe = async (email) => {

    const errors = {
        emailError: validateEmail(email)
    };

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return { errors };

    // Save the email to the database or send a confirmation email

    return { message: '¡Gracias por suscribirte al boletín!' };
}