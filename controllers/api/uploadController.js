import { deleteTempImage, storeTempImage } from '../../services/imageService.js';

export const uploadTempImage = async (req, res) => {

    const path = await storeTempImage({
        buffer: req.file.buffer,
        userId: req.user.id
    });

    return res.status(200).send(path);
}

export const revertTempImage = async (req, res) => {

    await deleteTempImage({
        filepath: req.body, 
        userId: req.user.id
    });

    return res.sendStatus(200);
}