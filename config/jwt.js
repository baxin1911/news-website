import jwt from 'jsonwebtoken';

const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
const JWT_SECRET_RESET = process.env.JWT_SECRET_RESET;

export const generateAccessToken = (user) => {

    const payload = { id: user.id, email: user.email, role: user.role };

    return jwt.sign(
        payload, 
        JWT_SECRET_ACCESS, 
        { expiresIn: '1h' }
    );
}

export const generateResetToken = (user) => {

    const payload = { id: user.id };

    return jwt.sign(
        payload, 
        JWT_SECRET_RESET, 
        { expiresIn: '15m' }
    );
}

export const generateRefreshToken = (user) => {

    const payload = { id: user.id, email: user.email };

    return jwt.sign(
        payload, 
        JWT_SECRET_REFRESH, 
        { expiresIn: '7d' }
    );
}

export const generateVerifyEmailToken = (user) => {

    const payload = { id: user.id };

    return jwt.sign(
        payload,
        JWT_SECRET_VERIFY,
        { expiresIn: '1d' }
    );
}

export const verifyAccessToken = (token) =>{

    try {

        return jwt.verify(token, JWT_SECRET_ACCESS);

    } catch (error) {
        
        return null;
    }
}