import express from 'express';
import { createUpload, validateFile } from '../../middleware/uploadFactoryMiddleware.js';
import { uploadTypes } from '../../config/uploadTypesConfig.js';
import { uploadTempImage } from '../../controllers/api/uploadController.js';
import { verifyCookiesAuthTokenRequired } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post(
    '/avatar',
    verifyCookiesAuthTokenRequired,
    createUpload(uploadTypes.AVATAR),
    validateFile(uploadTypes.AVATAR),
    uploadTempImage
);

router.post(
    '/cover',
    verifyCookiesAuthTokenRequired,
    createUpload(uploadTypes.COVER),
    validateFile(uploadTypes.COVER),
    uploadTempImage
);

export default router;