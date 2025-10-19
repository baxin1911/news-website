import { generateAccessToken, generateRefreshToken } from '../../config/jwt.js';

export const authGoogleController = async (req, res) => {

    if (req.query.error) return res.redirect('/?loginError=google');
    
    const { user } = req;
    const { _json, provider } = user;
    const userGoogle = { 
        code: 'AA000001',
        sub: _json.sub, 
        provider, 
        displayName: _json.name,
        givenName: _json.given_name,
        familyName: _json.familly_name,
        picture: _json.picture,
        email: _json.email,
        emailVerified: _json.email_verified,
        role: 1,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };

    const accessToken = generateAccessToken(userGoogle);
    const refreshToken = generateRefreshToken(userGoogle);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 *1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    res.redirect('/profile');
}

export const resetPasswordController = async (req, res) => {

    const { token } = req;

    res.render('reset', { token });
}

export const verifyEmailController = async (req, res) => {

    const { id } = req;

    //Search user and chance emailVerified
    //emailVerified = true

    const user = {
        email,
        emailVerified: true,
        displayName: 'dersey',
        code: 'AA000001',
        role: 1,
        picture: '/img/ejemplo.png',
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 *1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    // Save refresh token in BD

    res.redirect('/?verified=success');
}

export const logoutController = async (req, res) => {

    // Delete refreshToken from DB

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("/");
}