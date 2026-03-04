import { existsSync, mkdirSync, renameSync, statSync, unlinkSync } from 'fs';
import { writeFile } from 'fs/promises';
import { avatarsDir, coversDir, generateResolvedPath, getBaseDir, getDirname, getFileExt, getFilename, isValidBaseDir, sanitizePath, tempDir } from "../utils/pathsUtils.js";
import { fileTypeFromBuffer } from 'file-type';
import { FileNotFoundError, InvalidFileError, InvalidImagePathError, ServerFileSystemError } from '../errors/uploadError.js';

const processLocal = async ({ 
    
    sanitizedPath, 
    targetDir, 
    userId, 
    mode 

}) => {

    if ((mode === 'update' && targetDir === avatarsDir && !existsSync(avatarsDir)) ||
        (mode === 'update' && targetDir === coversDir && !existsSync(coversDir))
    ) throw new ServerFileSystemError();

    if (mode === 'create') {

        if (!existsSync(tempDir)) throw new ServerFileSystemError();

        const ext = getFileExt(sanitizedPath);

        if (!ext) throw new InvalidImagePathError();

        const filename = userId + ext;
        const fullDir = generateResolvedPath(targetDir, filename);
        const dirname = getDirname(fullDir);
    
        if (!existsSync(dirname)) mkdirSync(dirname, { recursive: true });

        const fullSanitizedPath = generateResolvedPath(tempDir, getFilename(sanitizedPath));

        if (!existsSync(fullSanitizedPath)) throw new FileNotFoundError();

        const stats = statSync(fullSanitizedPath);

        if (!stats.isFile()) throw new InvalidFileError();

        try {
            
            renameSync(fullSanitizedPath, fullDir);

        } catch (error) {

            throw error;
        }
    }
}

const processCloud = async ({ sanitizedPath, targetDir }) => {

    return;
}

const uploadLocal = async ({ 
    
    buffer, 
    targetDir, 
    userId,
    mode

}) => {

    const id = mode === 'download' ? userId : `${ crypto.randomUUID() }_${ userId }`;
    const type = await fileTypeFromBuffer(buffer);
    const filename = `${ id }.${ type.ext }`;
    const fullDir = generateResolvedPath(targetDir, filename);
    const dirname = getDirname(fullDir);

    if (!existsSync(dirname)) mkdirSync(dirname, { recursive: true });

    try {

        await writeFile(fullDir, buffer);

    } catch (err) {

        console.log(err);
        return { filename: null };
    }

    return { filename };
}

const uploadCloud = async ({ file }) => {

    return { url: null, id: null };
}

const revertLocal = ({ filepath, targetDir }) => {

    if (!existsSync(targetDir)) throw new ServerFileSystemError();

    const sanitizedPath = sanitizePath(filepath);
    const baseDir = getBaseDir(sanitizedPath);

    if (!isValidBaseDir(baseDir, ['temp'])) throw new InvalidImagePathError();

    const filename = getFilename(sanitizedPath);
    const fullDir = generateResolvedPath(targetDir, filename);

    if (!existsSync(fullDir)) throw new FileNotFoundError();

    const stats = statSync(fullDir);

    if (!stats.isFile()) throw new InvalidFileError();

    try {

        unlinkSync(fullDir);

    } catch (error) {

        throw error;
    }
} 

const revertCloud = async ({ filepath }) => {

    return;
}

export const storage = {

    async process({ sanitizedPath, targetDir, userId, mode }) {

        if (process.env.STORAGE === 'local') return processLocal({ sanitizedPath, targetDir, userId, mode });
        else return processCloud({ sanitizedPath, targetDir, userId, mode });
    },
    async upload({ buffer, targetDir, userId, mode }) {

        if (process.env.STORAGE === 'local') return uploadLocal({ buffer, targetDir, userId, mode });
        else return uploadCloud({ buffer });
    },
    async revert({ filepath, targetDir }) {

        if (process.env.STORAGE === 'local') return revertLocal({ filepath, targetDir });
        else return revertCloud({ filepath });
    }
}