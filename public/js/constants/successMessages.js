const successMessages = {
    CREATED_ACCOUNT: '¡Cuenta registrada exitosamente!',
    UPDATED_ACCOUNT: '¡Cuenta actualizada con éxito!',
    UPDATED_ACCOUNT_PASSWORD: '¡Contraseña actualizada con éxito!',
    UPDATED_RESET_PASSWORD: 'Si el correo está registrado, la contraseña ha sido actualizada.',
    SENDED_NEWSLETTER_EMAIL: '¡Gracias por suscribirte al boletín!',
    SENDED_RECOVER_EMAIL: 'Si el correo está registrado, recibirás un enlace para recuperar tu cuenta.',
    UPDATED_PREFERENCES: 'Preferencias actualizadas con éxito!',
    SUCCESS_LOGIN: '¡Inicio de sesión exitoso!',
    SUCCESS_LOGOUT: 'Sesión cerrada exitosamente.',
    VERIFIED_EMAIL: '¡Correo verificado exitosamente!',
    SUCCESS_SEARCH: 'Búsqueda exitosa.',
    CREATED_CONTACT: '¡Información de contacto guardado exitosamente!',
    CREATED_COMMENT: '¡Comentario registrado exitosamente!'
};

export const getSuccessMessage = (code) => successMessages[code] ?? null;