import indexRoutes from './routes/indexRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import session from 'express-session';
import flash from 'connect-flash';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', indexRoutes);
app.use('/newsletter', newsletterRoutes);
app.use('/search', searchRoutes);

app.use((req, res, next) => {
    res.status(404).render('error/404');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});