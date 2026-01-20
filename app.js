import 'dotenv/config.js';

import authApiRoutes from './routes/api/authApiRoute.js';
import newsletterApiRoutes from './routes/api/newsletterApiRoute.js';
import searchApiRoutes from './routes/api/searchApiRoute.js';
import profileApiRoutes from './routes/api/profileApiRoute.js';
import contactApiRoutes from './routes/api/contactApiRoute.js';

import profileUploadRoutes from './routes/upload/profileUploadRoute.js';

import profileTextRoute from './routes/text/profileTextRoute.js';

import indexWebRoutes from './routes/web/indexWebRoute.js';
import contactWebRoutes from './routes/web/contactWebRoute.js';
import feedWebRoutes from './routes/web/feedWebRoute.js'; 
import authWebRoutes from './routes/web/authWebRoute.js';
import profileWebRoutes from './routes/web/profileWebRoute.js';

import { checkTypeContentJson, checkTypeContentFile, checkContentTypePlainText } from './middleware/contentTypeMiddleware.js';
// import { apiLimiter } from './middleware/rateLimitMiddleware.js';
import cookieParser from 'cookie-parser';
import { Strategy } from 'passport-google-oauth20';

import express from 'express';
// import engine from 'ejs-mate';
import passport from 'passport';
import { publicDir, viewsDir, avatarsDir, coversDir } from './utils/pathsUtils.js';
import { errorCodeMessages } from './messages/codeMessages.js';

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const app = express();
const rootRoute = '/';
const apiRoute = '/api';
const textRoute = '/text';
const uploadRoute = '/upload';
const authRoute = '/auth';
const profileRoute = '/profile';

passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user
    return done(null, profile);
}));

// app.engine('ejs', engine);
app.set('views', viewsDir);
app.set('view engine', 'ejs');

app.use(rootRoute, express.static(publicDir));
app.use('/avatars', express.static(avatarsDir));
app.use('/covers', express.static(coversDir));

app.use(apiRoute, express.json());
app.use(textRoute, express.text({ type: 'text/plain' }));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

//middleware
app.use(passport.initialize());
app.use(apiRoute, checkTypeContentJson);
app.use(uploadRoute, checkTypeContentFile);
app.use(textRoute, checkContentTypePlainText);
// app.use(api, apiLimiter);

app.use((req, res, next) => {
    res.locals.flash = req.cookies.flash || null;
    res.clearCookie('flash');
    next();
});

// web routes
app.use(rootRoute, indexWebRoutes);
app.use(rootRoute, contactWebRoutes);
app.use(rootRoute, profileWebRoutes);
app.use(rootRoute, feedWebRoutes);
app.use(authRoute, authWebRoutes);

// api routes
app.use(apiRoute + authRoute, authApiRoutes);
app.use(apiRoute + '/newsletter', newsletterApiRoutes);
app.use(apiRoute + '/search', searchApiRoutes);
app.use(apiRoute + profileRoute, profileApiRoutes);
app.use(apiRoute + '/contacts', contactApiRoutes);

// upload routes
app.use(uploadRoute + profileRoute, profileUploadRoutes);

// text routes
app.use(textRoute + profileRoute, profileTextRoute)

app.use((req, res, next) => {
    res.status(405).json({ message: 'Método HTTP no permitido.' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});