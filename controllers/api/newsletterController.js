export const subscribeController = async (req, res) => {

    const { email } = req.body || {};

    // Save the email to the database or send a confirmation email
    // const result = await subscribe(email);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 403, 429, 500

    return res.status(202).json({ message: '¡Gracias por suscribirte al boletín!' });
}