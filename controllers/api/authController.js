import { generateAccessToken, generateOneTimeToken, generateRefreshToken } from "../../config/jwtlConfig.js";
import { encryptPassword } from "../../utils/encryptionUtils.js";
import { sendEmail } from "../../utils/sendEmailUtils.js";

export const loginController = async (req, res) => {

    const { email, password } = req.body || {};

    // Get user and verify token
    // const result = await login(email, password);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 429, 500

    const user = {
        email,
        emailVerified: true,
        displayName: 'dersey',
        code: 'AA000001',
        role: 1,
        profilePicture: '/img/ejemplo.png',
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };
    const newRefreshToken = generateRefreshToken(user);
    const newAccessToken = generateAccessToken(user);

    user.id = 1;

    // Save refreshToken in DB
    await createUser(user);

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 *1000
    });

    return res.status(200).json({ message: '¡Inicio de sesión exitoso!' });
}

export const registerController = async (req, res) => {

    const { email, password, username } = req.body || {};
    const hashPassword = await encryptPassword(password);

    // Save user and show errors for duplicate information
    // const result = await registerUser(username, email, hashPassword);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 409, 429, 500

    const user = { id: 1 }
    const token = generateOneTimeToken(user, 'email-verify');
    const verifyLink = `http://localhost:3000/auth/email-verify?token=${token}`;

    await sendEmail(email, 'Verifica tu correo', `
        <p>Has clic en el enlace para activar tu cuenta:</p>
        <a href="${ verifyLink }">${ verifyLink }</a>
    `);

    return res.status(201).json({ message: '¡Usuario registrado exitosamente!' });
}

export const recoverAccountController = async (req, res) => {

    const { email } = req.body || {};

    // Search email and idUser
    // const result = await recoverAccount(email);

    // if (result.error) return res.status(500).json({ message: result.error });

    //429, 500

    const user = { id: 1 };
    const token = generateOneTimeToken(user, 'password-reset');
    const resetLink = `http://localhost:3000/auth/password-reset?token=${token}`;
    await sendEmail(email, 'Restablece tu contraseña', `
        <p>Has clic en el enlace para restablecer tu contrsaeña:</p>
        <a href="${ resetLink }">${ resetLink }</a>
    `);

    return res.status(200).json({ message: 'Si el correo está registrado, recibirás un enlace para recuperar tu cuenta.' });
}

export const resetPasswordController = async (req, res) => {

    const { password } = req.body || {};
    const { id } = req || {};

    // Update password and verify errors and token
    // const result = await resetPassword(password, id);

    // if (result.error) return res.status(500).json({ message: result.error });

    //401, 403, 404, 429, 500

    return res.status(200).json({ message: 'Si el correo está registrado, la contraseña ha sido actualizada.' });
}