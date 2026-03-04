import { storage } from "../adapters/storageApdater.js"
import { EmptyFileError, InvalidImagePathError, UnauthUserEditFileError } from "../errors/uploadError.js";
import { getUserIdFromFilename } from "../utils/fileUtils.js";
import { avatarsDir, getFileExt, getNameFromFile, tempDir } from "../utils/pathsUtils.js";
import { getAvatarPathByUserId, getCoverPathByUserId } from "./profileService.js";

const PATH_TEMP = '/temp/';
const PATH_AVATAR = '/avatars/';
const PATH_COVER = '/covers/';

const uploadImage = async ({ 
    
    buffer, 
    targetDir, 
    userId,
    basePath,
    mode

}) => {

    const result = await storage.upload({ 
        buffer, 
        targetDir, 
        userId,
        mode
    });

    switch (process.env.STORAGE) {

        case 'local':

            if (result.filename) return basePath + result.filename;

            break;

        case 'cloud':

            break;

        default:

            break;
    }
}

const processImage = async ({

    sanitizedPath,
    targetDir,
    userId,
    getOldPath,
    basePath,
    mode

}) => {

    if (!['create', 'update'].includes(mode)) throw new InvalidImagePathError();

    if (mode === 'update') {

        const filename = getNameFromFile(sanitizedPath);

        if (filename !== userId) throw new UnauthUserEditFileError();
    }

    if (mode === 'create') {

        const uuid = getUserIdFromFilename(sanitizedPath);
    
        if (uuid !== userId) throw new UnauthUserEditFileError();
    }

    await storage.process({ 
        sanitizedPath, 
        targetDir, 
        userId, 
        mode 
    });
    
    if (mode === 'create') {

        const oldPath = await getOldPath(userId);
        const ext = getFileExt(sanitizedPath);
        const newPath = basePath + userId + ext;

        if (oldPath && oldPath !== newPath) await deleteImage({
            filepath: oldPath,
            userId
        });

        return newPath;
    }

    return sanitizedPath;
}

export const deleteImage = async ({ filepath, userId }) => {

    if (!filepath) throw new EmptyFileError();

    filepath = filepath.trim();

    const allowedPath = /^[a-zA-Z0-9/_\-\.]+\.(png|jpg|jpeg|webp)$/;
    
    if (!allowedPath.test(filepath)) throw new InvalidImagePathError();

    const uuid = getUserIdFromFilename(filepath);

    if (uuid !== userId) throw new UnauthUserEditFileError();

    await storage.revert({ 
        filepath, 
        targetDir: tempDir 
    });
}

export const processAvatarImage = async ({

    sanitizedPath, 
    targetDir, 
    userId,
    mode

}) => await processImage({

    sanitizedPath,
    targetDir,
    userId,
    getOldPath: getAvatarPathByUserId,
    basePath: PATH_AVATAR,
    mode

});

export const processCoverImage = async ({

    sanitizedPath, 
    targetDir, 
    userId,
    mode

}) => await processImage({

    sanitizedPath,
    targetDir,
    userId,
    getOldPath: getCoverPathByUserId,
    basePath: PATH_COVER,
    mode

});

export const saveAvatarImage = async ({ 
    
    buffer, 
    userId 

}) => await uploadImage({

    buffer,
    targetDir: avatarsDir,
    userId,
    basePath: PATH_AVATAR,
    mode: 'download'

});

export const storeTempImage = async ({ 
    
    buffer, 
    userId 

}) => await uploadImage({

    buffer,
    targetDir: tempDir,
    userId,
    basePath: PATH_TEMP,
    mode: 'create'

});

export const deleteTempImage = async ({
    
    filepath, 
    userId

}) => await deleteImage({ 

    filepath, 
    userId 

});