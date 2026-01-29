import { storage } from "../adapters/storageApdater.js"
import { getFileExt, getNameFromFile, tempDir } from "../utils/pathsUtils.js";
import { getAvatarPathByUserId, getCoverPathByUserId } from "./userService.js";

const PATH_TEMP = '/temp/';
const PATH_AVATAR = '/avatars/';
const PATH_COVER = '/covers/';

const processImage = async ({

    filepath,
    targetDir,
    userId,
    getOldPath,
    basePath,
    mode

}) => {

    if (!['create', 'update'].includes(mode)) return -1;

    if (mode === 'update') {

        const filename = getNameFromFile(filepath);
    
        if (filename !== userId) return -2;
    }

    await storage.process(filepath, targetDir, userId, mode);

    if (mode === 'update') return filepath;
    
    if (typeof result === 'number' && result < 1) return result;

    if (mode === 'create') {

        const oldPath = await getOldPath(userId);
        const ext = getFileExt(filepath);
        const newPath = basePath + userId + ext;

        if (oldPath && oldPath !== newPath) return await deleteImage(oldPath, targetDir);

        return newPath;
    }
}

export const processAvatarImage = async (

    filepath, 
    targetDir, 
    userId,
    mode

) => processImage({

    filepath,
    targetDir,
    userId,
    getOldPath: getAvatarPathByUserId,
    basePath: PATH_AVATAR,
    mode

});

export const processCoverImage = async (

    filepath, 
    targetDir, 
    userId,
    mode

) => processImage({

    filepath,
    targetDir,
    userId,
    getOldPath: getCoverPathByUserId,
    basePath: PATH_COVER,
    mode

});

export const saveAvatarImage = async (buffer, targetDir, userId) => {

    const result = await storage.upload({ buffer, targetDir, userId, mode: 'download' });

    switch (process.env.STORAGE) {

        case 'local':

            if (result.filename) return PATH_AVATAR + result.filename;

            break;

        case 'cloud':

            break;

        default:

            break;
    }
}

export const storeTempImage = async (buffer, targetDir) => {

    const result = await storage.upload({ buffer, targetDir, mode: 'temp' });

    return process.env.STORAGE === 'local' ? (PATH_TEMP + result.filename) : result.url;
}

export const deleteTempImage = async (imagepath) => {

    if (!imagepath) return -1;

    const path = imagepath.trim();

    const allowedPath = /^[a-zA-Z0-9/_\-\.]+\.(png|jpg|jpeg|webp)$/;
    
    if (!allowedPath.test(path)) return -2;

    const result = await storage.revert(path, tempDir);

    return result;
}