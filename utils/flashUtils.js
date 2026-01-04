export const redirectWithFlash = (res, message, code, type, path = '/') => {

    let flash = {
        message,
        code,
        type
    }

    res.cookie('flash', flash, { maxAge: 5000, httpOnly: true });
    return res.redirect(path);
}