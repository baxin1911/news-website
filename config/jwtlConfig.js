import jwt from 'jsonwebtoken';

const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
const JWT_SECRET_ONE_TIME = process.env.JWT_SECRET_ONE_TIME;

export const generateAccessToken = (user) => {

    return jwt.sign(user, JWT_SECRET_ACCESS, { expiresIn: '1h' });
}

export const generateOneTimeToken = (user, purpose) => {

    const payload = { id: user.id, purpose };

    return jwt.sign(
        payload, 
        JWT_SECRET_ONE_TIME, 
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

export const verifyAccessToken = (token) => {

    try {

        return jwt.verify(token, JWT_SECRET_ACCESS);

    } catch (error) {
        
        return null;
    }
}

export const verifyOneTimeToken = (token) => {
    
    try {

        return jwt.verify(token, JWT_SECRET_ONE_TIME);

    } catch(err) {

        return null;
    }
}