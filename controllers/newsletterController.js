export const subscribe = (req, res) => {
    const { email } = req.body || null;

    if (!email) {
        req.flash('error', 'El correo electrónico es requerido');
        return res.redirect('/');
    }

    const isValid = validateEmailFormat(email);

    if (!isValid) {
        req.flash('error', 'El correo electrónico no es válido');
        return res.redirect('/');
    }

    // Save the email to the database or send a confirmation email

    req.flash('success', '¡Gracias por suscribirte al boletín!');
    res.redirect('/');
}