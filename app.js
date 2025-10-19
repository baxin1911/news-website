import 'dotenv/config.js';

import authApiRoutes from './routes/api/auth.js';
import newsletterApiRoutes from './routes/api/newsletter.js';
import searchApiRoutes from './routes/api/search.js';
import profileApiRoutes from './routes/api/user.js';

import webRoutes from './routes/web/index.js';
import feedWebRoutes from './routes/web/feed.js'; 
import authWebRoutes from './routes/web/auth.js';
import userWebRoutes from './routes/web/user.js';

import { checkContentType } from './middleware/errorHandler.js';
// import { apiLimiter } from './middleware/rateLimit.js';
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
app.use('/', webRoutes);
app.use('/', feedWebRoutes);
app.use('/auth', authWebRoutes);
app.use('/', userWebRoutes);

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