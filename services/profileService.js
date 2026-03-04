import { avatarsDir, coversDir, getBaseDir, sanitizePath } from '../utils/pathsUtils.js';
import { processAvatarImage, processCoverImage } from '../services/imageService.js';
import { createProfileDtoForUpdate } from '../dtos/profileDTO.js';
import { successCodeMessages } from '../messages/codeMessages.js';
import { editUsernameByUserId, getAllUsers } from './userService.js';

const profiles = [
    {
        id: 2,
        code: 'AA000001',
        avatarPath: null,
        coverPath: null,
        name: null,
        lastName: null,
        userId: await getAllUsers().then(users => users[0]?.id ?? null)
    }
];

export const saveProfile = async (profileDto) => {
    
    profiles.push(profileDto);
}

export const getAvatarPathByUserId = async (userId) => {

    return profiles.find(profile => profile.userId === userId).avatarPath;
}

export const getCoverPathByUserId = async (userId) => {

    return profiles.find(profile => profile.userId === userId).coverPath;
}

export const getFullnameByUserId = async (userId) => {

    const profile = profiles.find(profile => profile.userId === userId);

    return `${ profile.name } ${ profile.lastName }`;
}

export const getAllProfiles = async () => {

    return profiles;
}

export const getProfileByUserId = async (userId) => {

    return profiles.find(profile => profile.userId === userId) || null;
}

export const editProfileAccount = async (userId, data) => {

    if (data.avatarPath) {

        const sanitizedPath = sanitizePath(data.avatarPath);
        const baseDir = getBaseDir(sanitizedPath);
        const mode = baseDir === 'temp' ? 'create' : (baseDir === 'avatars' ? 'update' : null);

        const path = await processAvatarImage({ 
            sanitizedPath, 
            targetDir: avatarsDir, 
            userId, 
            mode 
        });

        data.avatarPath = path;
    }

    if (data.coverPath) {

        const sanitizedPath = sanitizePath(data.coverPath);
        const baseDir = getBaseDir(sanitizedPath);
        const mode = baseDir === 'temp' ? 'create' : (baseDir === 'covers' ? 'update' : null);

        const path = await processCoverImage({ 
            sanitizedPath, 
            targetDir: coversDir, 
            userId, 
            mode 
        });

        data.coverPath = path;
    }

    const isUsernameUpdated = await editUsernameByUserId(userId, data.username);

    const profileDto = createProfileDtoForUpdate(data);

    const isProfileUpdated = await editProfileInfoByUserId(profileDto, userId);

    return { 
        code: successCodeMessages.UPDATED_ACCOUNT, 
        isProfileUpdated, 
        isUsernameUpdated 
    };
}

export const editProfileInfoByUserId = async (

    { name, lastName, coverPath, avatarPath }, 
    userId

) => {

    const profile = profiles.find(profile => profile.userId === userId);

    if (profile) {
        profile.name = name;
        profile.lastName = lastName;
        profile.avatarPath = avatarPath;
        profile.coverPath = coverPath;

        return true;
    }

    return false;
}