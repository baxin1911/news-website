export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;

    if (!email) return 'El correo es requerido';
    if (!regex.test(email)) return 'El formato del correo no es válido';
    if (email.length < 10) return 'El correo debe tener al menos 10 caracteres';
    if (email.length > 100) return 'El correo es demasiado largo';

    return null;
}

export const validatePassword = (password) => {
    const regex = /^[A-Za-z0-9!@#\$%\^&\*]+$/;

    if (!password) return 'La contraseña es requerida';
    if (!regex.test(password) || password.toLowerCase() === password || password.toUpperCase() === password || !/[0-9]/.test(password) || !/[!@#\$%\^&\*]/.test(password)) return 'La contraseña debe tener al menos una letra minuscula, una letra mayuscula, un número y un símbolo especial';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (password.length > 100) return 'La contraseña es demasiado larga';
    
    return null;
}

export const validateRepeatedPassword = (password, repeatedPassword) => {

    if (repeatedPassword !== password) return 'La contraseña no coincide';

    return null;
}

export const validateUsername = (username) => {
    const regex = /\w+/;

    if (!username) return 'El nombre de usuario es requerido';
    if (!regex.test(username)) return 'El nombre de usuario debe tener solo letras, numeros y guiones bajos';
    if (username.length < 10) return 'El nombre de usuario debe tener al menos 10 caracteres';
    if (username.length > 30) return 'El nombre de usuario es demasiado largo';

    return null;
}