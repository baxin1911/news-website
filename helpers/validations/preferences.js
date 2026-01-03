export const validateBooleanField = (value) => {

    if (typeof value !== 'boolean') return 'El campo debe ser un valor booleano';

    return null;
}