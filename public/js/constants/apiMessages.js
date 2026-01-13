const errorMessages = {
    EMAIL_EMPTY: 'El correo electrónico es requerido.',
    EMAIL_NOT_STRING: 'El correo electrónico debe ser una cadena de texto.',
    EMAIL_INVALID_FORMAT: 'El formato del correo electrónico es inválido.',
    EMAIL_TOO_SHORT: 'El correo electrónico debe tener al menos 10 caracteres.',
    EMAIL_TOO_LONG: 'El correo electrónico no debe tener más de 100 caracteres.',
    PASSWORD_EMPTY: 'La contraseña es requerida.',
    PASSWORD_NOT_STRING: 'La contraseña debe ser una cadena de texto.',
    PASSWORD_NEEDS_NUMBER: 'La contraseña debe contener al menos un número.',
    PASSWORD_NEEDS_UPPERCASE: 'La contraseña debe contener al menos una letra mayúscula.',
    PASSWORD_INVALID_FORMAT: 'La contraseña debe contener al menos un caracter especial.',
    PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres.',
    PASSWORD_TOO_LONG: 'La contraseña no debe tener más de 100 caracteres.',
    PASSWORDS_DO_NOT_MATCH: 'Las contraseñas no coinciden.',
    USERNAME_EMPTY: 'El nombre de usuario es requerido.',
    USERNAME_NOT_STRING: 'El nombre de usuario debe ser una cadena de texto.',
    USERNAME_INCLUDE_SPACE: 'El nombre de usuario no debe contener espacios.',
    USERNAME_INVALID_CHARS: 'El nombre de usuario debe contener solo números, letras y guiones bajos.',
    USERNAME_TOO_SHORT: 'El nombre de usuario debe tener al menos 3 caracteres.',
    USERNAME_TOO_LONG: 'El nombre de usuario no debe tener más de 100 caracteres.',
    NAME_EMPTY: 'El nombre es requerido.',
    NAME_NOT_STRING: 'El nombre debe ser una cadena de texto.',
    NAME_TOO_SHORT: 'El nombre debe tener al menos 2 caracteres.',
    NAME_TOO_LONG: 'El nombre no debe tener más de 50 caracteres.',
    NAME_INVALID_CHARS: 'El nombre debe contener solo letras y espacios.',
    LAST_NAME_EMPTY: 'El apellido es requerido.',
    LAST_NAME_NOT_STRING: 'El apellido debe ser una cadena de texto.',
    LAST_NAME_TOO_SHORT: 'El apellido debe tener al menos 2 caracteres.',
    LAST_NAME_TOO_LONG: 'El apellido no debe tener más de 50 caracteres.',
    LAST_NAME_INVALID_CHARS: 'El apellido debe contener solo letras y espacios.',
    OPTION_EMPTY: 'Esta opción es requerida.',
    OPTION_NOT_BOOLEAN: 'Esta opción debe ser un valor booleano.',
    TEXT_EMPTY: 'El texto de búsqueda es requerido.',
    TEXT_NOT_STRING: 'El texto de búsqueda debe ser una cadena de texto.',
    TEXT_TOO_SHORT: 'El texto de búsqueda debe tener al menos un caracter.',
    TEXT_TOO_LONG: 'El texto de búsqueda debe tener menos de 500 caracteres.',
    LOGIN_ERROR_GOOGLE: 'Error de autenticación con Google.',
    LOGIN_ERROR: 'Usuario o contraseña incorrectos.',
    VALIDATION_ERROR: 'Errores de validación',
    AUTH_INVALID: 'Sesión inválida. Inicia sesión nuevamente.',
    LINK_INVALID: 'Enlace inválido. Solicita uno nuevo.',
    LIMIT_FILE_SIZE: 'El archivo es muy grande',
    LIMIT_FILE_COUNT: 'Debe enviarse un archivo',
    LIMIT_UNEXPECTED_FILE: 'Campo incorrecto',
    LIMIT_FIELD_KEY: 'El nombre del campo es muy largo',
    LIMIT_FIELD_VALUE: 'El valor es muy largo',
    CONTENT_TYPE_INVALID: 'El Content-Type debe contener ',
    IMAGE_PATH_NOT_STRING: 'La ruta de la imagen no es una cadena de texto.',
    INVALID_IMAGE_PATH: 'La imagen debe ser temporal.'
};

const successMessages = {
    ACCOUNT_CREATED: '¡Cuenta registrada exitosamente!',
    ACCOUNT_UPDATED: '¡Cuenta actualizada con éxito!',
    ACCOUNT_PASSWORD_UPDATED: '¡Contraseña actualizada con éxito!',
    EMAIL_PASSWORD_UPDATED: 'Si el correo está registrado, la contraseña ha sido actualizada.',
    NEWSLETTER_EMAIL_SENDED: '¡Gracias por suscribirte al boletín!',
    RECOVER_EMAIL_SENDED: 'Si el correo está registrado, recibirás un enlace para recuperar tu cuenta.',
    PREFERENCES_UPDATED: 'Preferencias actualizadas con éxito!',
    LOGIN_SUCCESS: '¡Inicio de sesión exitoso!',
    LOGOUT_SUCCESS: 'Sesión cerrada exitosamente.',
    EMAIL_VERIFIED: '¡Correo verificado exitosamente!',
    SEARCH_SUCCESS: 'Búsqueda exitosa'
};

const infoMessages = {
    NO_CONTENT_SEARCH: 'No se encontraron resultados'
}

export const getErrorMessage = (code) => errorMessages[code] ?? null;

export const getSuccessMessage = (code) => successMessages[code] ?? null;