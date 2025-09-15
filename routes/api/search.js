import express from 'express';
import { searchArticleController } from '../../controllers/api/searchController.js';

const router = express.Router();

router.get('/', (req, res) => {

    const { q } = req.query || {};
    const errors = { textError: validateQuery(q) };

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json( { errors, message: 'Errores de validación' });

    next();

}, searchArticleController);

export default router;