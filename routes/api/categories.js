import express from 'express';
import { getAllCategories } from '../../controllers/categoryController.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const categories = await getAllCategories();

    res.status(200).json(categories);
});