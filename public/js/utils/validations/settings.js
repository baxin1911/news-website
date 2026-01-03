export const validateBooleanField = (checked) => {

    if (typeof checked !== 'boolean') return 'El valor debe ser verdadero o falso.';
    
    return null;
};