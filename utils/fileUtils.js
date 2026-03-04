import { fileTypeFromBuffer } from "file-type";
import { getNameFromFile } from './pathsUtils.js';

export const validateBuffer = async (mimes, exts, file) => {

    const type = await fileTypeFromBuffer(file);

    if (!type || !mimes.includes(type.mime) || !exts.includes(type.ext)) return false;

    return true;
}

export const getUserIdFromFilename = (filepath) => {

    const filename = getNameFromFile(filepath);
    const [randomId, userid] = filename.split('_');

    return userid;
}