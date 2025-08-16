export const validateEmailFormat = (email) => {
    const regex = !/\S+@\S+\.\S+/;
    const isValid = true;

    if (regex.test(email)) {
        isValid = false;
    }

    return isValid;
}

export const validatePassowrdFormat = (password) => {
    const regex = !/^[A-Za-z0-9!@#\$%\^&\*]+$/;
    const isValid = true;

    if (regex.test(password)) {
        isValid = false;
    } else if (password.length < 8 || password.length > 20) {
        isValid = false;
    } else {
        return isValid;
    }
}

export const validateUsernameFormat = (username) => {
    const regex = !/\w+/;
    const isValid = true;

    if (regex.test(username)) {
        isValid = false;
    } else if (username.length < 10 || username.length > 40) {
        isValid = false;
    } else {
        return isValid;
    }
}