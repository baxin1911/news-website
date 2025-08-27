import noticesApiRoutes from './routes/api/notices.js';
import authApiRoutes from './routes/api/auth.js';
import newsletterApiRoutes from './routes/api/newsletter.js';
import searchApiRoutes from './routes/api/search.js';

import webRoutes from './routes/web/index.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { checkContentType } from './middleware/contentType.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const api = '/api';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
// app.use(checkContentType);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));

// web routes
app.use('/', webRoutes);

// api routes
app.use(api + '/notices', noticesApiRoutes);
app.use(api + '/auth', authApiRoutes);
app.use(api + '/newsletter', newsletterApiRoutes);
app.use(api + '/search', searchApiRoutes);

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