import { existsSync, mkdirSync, renameSync, statSync, unlinkSync } from 'fs';
import { writeFile } from 'fs/promises';
import { generateResolvedPath, getDirname, getFilename, isValidBaseDir, sanitizePath, tempDir } from "../utils/pathsUtils.js";
import { randomUUID } from 'crypto';
import { fileTypeFromBuffer } from 'file-type';

const processLocal = async (filepath, targetDir) => {

    if (!existsSync(tempDir)) return -1;

    const sanitizedPath = sanitizePath(filepath);

    if (!isValidBaseDir(sanitizedPath, ['temp'])) return -2;

    const filename = getFilename(sanitizedPath);
    const fullDir = generateResolvedPath(targetDir, filename);
    const dirname = getDirname(fullDir);
    
    if (!existsSync(dirname)) mkdirSync(dirname, { recursive: true });

    const stats = statSync(sanitizedPath);

    if (!stats.isFile()) return -3;

    // validate user -4

    try {
        
        renameSync(sanitizedPath, fullDir);

        return 1;

    } catch (err) {

        console.log(err);
        return -5;
    }
}

const processCloud = async (filepath, targetDir) => {

    return;
}

const uploadLocal = async (buffer, targetDir) => {

    const id = randomUUID();
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

const uploadCloud = async (file) => {

    return { url: null, id: null };
}

const rollbackLocal = (filepath, targetDir, validBaseDir) => {

    if (!existsSync(targetDir)) return -3;

    const sanitizedPath = sanitizePath(filepath);

    if (!isValidBaseDir(sanitizedPath, validBaseDir)) return -2;

    const filename = getFilename(sanitizedPath);
    const fullDir = generateResolvedPath(targetDir, filename);

    if (!existsSync(fullDir)) return -4;

    const stats = statSync(fullDir);

    if (!stats.isFile()) return -5;

    // validate user -6

    try {

        unlinkSync(fullDir);

        return 1;

    } catch (err) {

        console.log(err);
        return -7;
    }
} 

const revertLocal = (filepath, targetDir) => rollbackLocal(filepath, targetDir, ['temp']);

const revertCloud = async (filepath) => {

    return;
}


const deleteLocal = (filepath, targetDir) => rollbackLocal(filepath, targetDir, ['avatars', 'covers']);


const deleteCloud = async (filepath) => {

    return;
}

export const storage = {

    async process(filepath, targetDir) {

        if (process.env.STORAGE === 'local') return processLocal(filepath, targetDir);
        else return processCloud(filepath, targetDir);
    },
    async upload(buffer, targetDir) {

        if (process.env.STORAGE === 'local') return uploadLocal(buffer, targetDir);
        else return uploadCloud(buffer);
    },
    async revert(filepath, targetDir) {

        if (process.env.STORAGE === 'local') return revertLocal(filepath, targetDir);
        else return revertCloud(filepath);
    },
    async delete(filepath, targetDir) {

        if (process.env.STORAGE === 'local') return deleteLocal(filepath, targetDir);
        else return deleteCloud(filepath);
    }
}