export const subscribe = (req, res) => {
    const { email } = req.body;

    if (!email) {
        req.flash('error', 'El correo electrónico es requerido');
        return res.redirect('/');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        req.flash('error', 'El correo electrónico no es válido');
        return res.redirect('/');
    }

    // Save the email to the database or send a confirmation email

    req.flash('success', '¡Gracias por suscribirte al boletín!');
    res.redirect('/');
}