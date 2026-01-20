import { errorCodeMessages } from '../../messages/codeMessages.js';
import { deleteTempImage, storeTempImage } from '../../services/imageService.js';
import { tempDir } from '../../utils/pathsUtils.js';

export const uploadTempImage = async (req, res) => {

    const { file } = req;

    const path = await storeTempImage(file.buffer, tempDir);

    return res.status(200).send(path);
}

export const revertTempImage = async (req, res) => {

    const filepath = req.body;

    const result = await deleteTempImage(filepath);

    if (result === -1) return res.status(400).json({ code: errorCodeMessages.EMPTY_FILE });

    if (result === -2) return res.status(500).json({ code: errorCodeMessages.INVALID_IMAGE_PATH });

    if (result === -3) return res.status(500).json({ code: errorCodeMessages.FILE_NOT_FOUND });

    if (result === -4) return res.status(404).json({ code: errorCodeMessages.FILE_NOT_FOUND });

    if (result === -5) return res.status(500).json({ code: errorCodeMessages.INVALID_FILE });

    if (result === -6) return res.status(409).json({ code: errorCodeMessages.UNAUTH_USER_EDIT_FILE });

    if (result === -7) return res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });

    return res.sendStatus(200);
}