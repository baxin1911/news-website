export const validateDisplayName = (displayName) => {
    const regex = /\w+/;

    if (!displayName) return 'El nombre público es requerido';
    if (typeof displayName !== 'string') return 'El nombre público debe ser una cadena de texto';
    if (displayName.includes(' ')) return 'El nombre público no debe contener espacios';
    if (displayName.toLowerCase() === displayName) return 'El nombre público debe tener al menos una letra mayúscula';
    if (!regex.test(displayName)) return 'El nombre público debe tener solo letras, numeros y guiones bajos';
    if (displayName.length < 3) return 'El nombre público debe tener al menos 4 caracteres';
    if (displayName.length > 100) return 'El nombre público debe tener menos de 100 caracteres';

    return null;
}

export const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;

    if (typeof name !== 'string') return 'El nombre debe ser una cadena de texto';
    if (!regex.test(name)) return 'El nombre debe tener solo letras, numeros y guiones bajos';
    if (name.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (name.length > 100) return 'El nombre debe tener menos de 100 caracteres';

    return null;
}

export const validateLastName = (lastname) => {
    const regex = /^[a-zA-Z\s]+$/;

    if (typeof lastname !== 'string') return 'El apellido debe ser una cadena de texto';
    if (!regex.test(lastname)) return 'El apellido debe tener solo letras, numeros y guiones bajos';
    if (lastname.length < 3) return 'El apellido debe tener al menos 3 caracteres';
    if (lastname.length > 100) return 'El apellido debe tener menos de 100 caracteres';

    return null;
}

export const validatePassword = (password) => {
    const regex = /^[A-Za-z0-9!@#\$%\^&\*]+$/;

    if (typeof password !== 'string') return 'La contraseña debe ser una cadena de texto';
    if (password.includes(' ')) return 'La contraseña no debe contener espacios';
    if (password.toLowerCase() === password) return 'La contraseña debe tener al menos una letra mayúscula';
    if (!regex.test(password)) return 'La contraseña debe tener al menos una numero y símbolo especial';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (password.length > 100) return 'La contraseña es demasiado larga';
    
    return null;
}