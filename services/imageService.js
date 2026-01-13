import { storage } from "../adapters/storageApdater.js"
import { getFilename, tempDir } from "../utils/pathsUtils.js";
import { profiles } from "./profileService.js";

const PATH_TEMP = '/temp/';
const PATH_AVATAR = '/avatars/';
const PATH_COVER = '/covers/';

export const processAvatarTempImage = async (filepath, targetDir) => {

    let result = await storage.process(filepath, targetDir);
    
    if (result !== 1) return result;

    // get avatar by userId
    const oldAvatar = profiles[0].avatarPath;

    const filename = getFilename(filepath);
    const newAvatar = PATH_AVATAR + filename;

    if (oldAvatar && oldAvatar !== newAvatar) result = await deleteImage(oldAvatar, targetDir);

    profiles[0].avatarPath = newAvatar;

    return result;
}

export const processCoverTempImage = async (filepath, targetDir) => {

    let result = await storage.process(filepath, targetDir);
    
    if (result !== 1) return result;

    // get cover by userId
    const oldCover = profiles[0].coverPath;

    const filename = getFilename(filepath);
    const newCover = PATH_COVER + filename;

    if (oldCover && oldCover !== newCover) result = await deleteImage(oldCover, targetDir);

    profiles[0].coverPath = newCover;

    return result;
}

export const saveAvatarImage = async (buffer, targetDir) => {

    const result = await storage.upload(buffer, targetDir);

    switch (process.env.STORAGE) {

        case 'local':

            if (result.filename) profiles[0].avatarPath = PATH_AVATAR + result.filename;
            break;

        case 'cloud':

            break;

        default:

            break;
    }
}

export const storeTempImage = async (buffer, targetDir) => {

    const result = await storage.upload(buffer, targetDir);

    return process.env.STORAGE === 'local' ? (PATH_TEMP + result.filename) : result.url;
}

const deleteImage = async (imagepath, targetDir) => {

    const result = await storage.delete(imagepath, targetDir);

    return result;
}

export const deleteTempImage = async (imagepath) => {

    const path = imagepath.trim();

    if (!path) return -1;

    const allowedPath = /^[a-zA-Z0-9/_\-\.]+\.(png|jpg|jpeg|webp)$/;
    
    if (!allowedPath.test(path)) return -2;

    const result = await storage.revert(path, tempDir);

    return result;
}