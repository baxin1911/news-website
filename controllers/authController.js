import { validateEmailFormat, validatePassowrdFormat } from "../helpers/validations/auth";

export const login = (req, res) => {
    const { email } = req.body || null;
    const { password } = req.body || null;

    if (!email || !password) {
        req.flash('error', 'Llenar todos los campos');
        return res.redirect('/modals/login');
    }

    const isValidEmail = validateEmailFormat(email);
    const isValidPassword = validatePassowrdFormat(password);

    if (!isValidEmail || !isValidPassword) {
        req.flash('error', 'Datos incorrectos');
        return res.redirect('/modals/login');
    }

    // Get user and show success message

    req.session.user = { email };
    res.redirect('/');
}

export const registerUser = (req, res) => {
    
}

export const recoverPassword = (email) => {

}