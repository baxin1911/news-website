import { encryptPassword } from "../helpers/encryption.js";
import { validateEmail, validatePassowrd, validateRepeatedPassowrd, validateUsername } from "../helpers/validations/auth.js";

export const login = async (email, password) => {

    const emailError = validateEmail(email);
    const passwordError = validatePassowrd(password);

    if (emailError || passwordError) return { error: 'Correo o contraseña incorrecto.' };

    // Get user and verify auth

    return { message: '¡Inicio de sesión exitoso!' };
}

export const logout = async (userId) => {

    // Invalidate tokens (from BD/Redis) and perform logout actions

    return { message: '¡Has cerrado sesión exitosamente!' };
}

export const registerUser = async (username, email, password, repeatedPassword) => {

    const errors = {
        emailError: validateEmail(email),
        passwordError: validatePassowrd(password),
        repeatedPasswordError: validateRepeatedPassowrd(password, repeatedPassword),
        usernameError: validateUsername(username)
    };

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return { errors };

    const hashPassword = await encryptPassword(password);

    // Save user and show errors for duplicate information

    return { message: '¡Usuario registrado exitosamente!' };
}

export const recoverAccount = async (email) => {

    const errors = {
        emailError: validateEmail(email)
    };
    
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return { errors };

    // Search email and send a message with token and link

    return { message: 'Si el correo está registrado, recibirás un enlace para recuperar tu cuenta.' };
}

export const resetPassword = async (password, id) => {

    const errors = {
        passwordError: validatePassowrd(password)
    };

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return { errors };

    const hashPassword = await encryptPassword(password);

    // Update password and verify errors and token

    return { message: 'Si el correo está registrado, la contraseña ha sido actualizada.' };
}