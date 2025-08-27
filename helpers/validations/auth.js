export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;

    if (!email) return 'El correo es requerido';
    if (typeof email !== 'string') return 'El correo debe ser una cadena de texto';
    if (email.includes(' ')) return 'El correo no debe contener espacios';
    if (!regex.test(email)) return 'El formato del correo no es válido';
    if (email.length < 10) return 'El correo debe tener al menos 10 caracteres';
    if (email.length > 100) return 'El correo es demasiado largo';

    return null;
}

export const validatePassowrd = (password) => {
    const regex = /^[A-Za-z0-9!@#\$%\^&\*]+$/;

    if (!password) return 'La contraseña es requerida';
    if (typeof password !== 'string') return 'La contraseña debe ser una cadena de texto';
    if (password.includes(' ')) return 'La contraseña no debe contener espacios';
    if (password.toLowerCase() === password) return 'La contraseña debe tener al menos una letra mayúscula';
    if (!regex.test(password)) return 'La contraseña debe tener al menos una numero y símbolo especial';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (password.length > 100) return 'La contraseña es demasiado larga';
    
    return null;
}

export const validateRepeatedPassowrd = (password, repeatedPassword) => {

    if (repeatedPassword !== password) return 'La contraseña no coincide';

    return null;
}

export const validateUsername = (username) => {
    const regex = /\w+/;

    if (!username) return 'El nombre de usuario es requerido';
    if (typeof username !== 'string') return 'El nombre de usuario debe ser una cadena de texto';
    if (username.includes(' ')) return 'El nombre de usuario no debe contener espacios';
    if (username.toLowerCase() === username) return 'El nombre de usuario debe tener al menos una letra mayúscula';
    if (!regex.test(username)) return 'El nombre de usuario debe tener solo letras, numeros y guiones bajos';
    if (username.length < 10) return 'El nombre de usuario debe tener al menos 10 caracteres';
    if (username.length > 30) return 'El nombre de usuario es demasiado largo';

    return null;
}