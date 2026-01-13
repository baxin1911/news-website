import express from 'express';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';
import { revertTempImage } from '../../controllers/api/uploadController.js';

const router = express.Router();

router.post(
    '/avatar',
    verifyCookiesAuthTokenRequired,
    revertTempImage
);

router.post(
    '/cover',
    verifyCookiesAuthTokenRequired,
    revertTempImage
)

export default router;