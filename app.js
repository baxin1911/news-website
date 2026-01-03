import 'dotenv/config.js';

import authApiRoutes from './routes/api/authApiRoute.js';
import newsletterApiRoutes from './routes/api/newsletterApiRoute.js';
import searchApiRoutes from './routes/api/searchApiRoute.js';
import profileApiRoutes from './routes/api/profileApiRoute.js';

import indexWebRoutes from './routes/web/indexWebRoute.js';
import feedWebRoutes from './routes/web/feedWebRoute.js'; 
import authWebRoutes from './routes/web/authWebRoute.js';
import profileWebRoutes from './routes/web/profileWebRoute.js';

import { checkContentType } from './middleware/errorHandlerMiddleware.js';
// import { apiLimiter } from './middleware/rateLimitMiddleware.js';
import cookieParser from 'cookie-parser';
import { Strategy } from 'passport-google-oauth20';

import express from 'express';
// import engine from 'ejs-mate';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const api = '/api';

passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user
    return done(null, profile);
}));

// app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(passport.initialize());
app.use(api, checkContentType);
app.use(cookieParser());
// app.use(api, apiLimiter);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));

// web routes
app.use('/', indexWebRoutes);
app.use('/', feedWebRoutes);
app.use('/auth', authWebRoutes);
app.use('/', profileWebRoutes);

// api routes
app.use(api + '/auth', authApiRoutes);
app.use(api + '/newsletter', newsletterApiRoutes);
app.use(api + '/search', searchApiRoutes);
app.use(api + '/profile', profileApiRoutes);

app.use((req, res, next) => {
    res.status(405).json({ message: 'Método HTTP no permitido.' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error del servidor.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});