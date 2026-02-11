import { createUserPreferencesDtoForRegister } from "../dtos/preferencesDTO.js";
import { createProfileDtoForRegister } from "../dtos/profileDTO.js";
import { createUserDtoForRegister } from "../dtos/userDTO.js";
import { comparePassword, encryptPassword } from "../utils/encryptionUtils.js";

let users = [
    {
        id: crypto.randomUUID(),
        email: 'dersey@example.com',
        verifiedEmail: true,
        password: await encryptPassword('Qwerty%1'),
        username: 'frontierZone',
        roleId: 1
    }
];

let roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 1, name: 'author' },
]

const profiles = [
    {
        id: 2,
        code: 'AA000001',
        avatarPath: null,
        coverPath: null,
        name: null,
        lastName: null,
        userId: users[0].id
    }
];

const listPreferences = [
    {
        id: crypto.randomUUID(),
        commentNotifications: false,
        followingNotifications: true,
        newsletterNotifications: false,
        userId: users[0].id
    }
];

const contacts = [];

export const saveProfile = async ({ userId }) => {
    
    const profileDto = createProfileDtoForRegister();
    profileDto.userId = userId;
    profiles.push(profileDto);
}

export const saveUser = async (body) => {

    const userDto = await createUserDtoForRegister(body);
    users.push(userDto);
    
    return userDto.id;
}

export const saveUserPreferences = async (userId) => {

    const preferencesDto = createUserPreferencesDtoForRegister(userId);
    listPreferences.push(preferencesDto);
}

export const saveContact = async (contact) => {

    contacts.push(contact);
}

export const findUsersByIdUser = async (id) => {

    const users = [
        { id: 1, displayName: 'dsV45-sf', picture: 'https://i.pravatar.cc/45' },
        { id: 2, displayName: 'niTso_ef', picture: 'https://i.pravatar.cc/45' },
        { id: 3, displayName: '124_Dfrtrt', picture: 'https://i.pravatar.cc/45' },
        { id: 4, displayName: '124-45_6asA', picture: 'https://i.pravatar.cc/45' },
        { id: 5, displayName: 'CCV-FG34fr', picture: 'https://i.pravatar.cc/45' },
        { id: 6, displayName: 'AD-ddfr44', picture: 'https://i.pravatar.cc/45' }
    ];

    return users;
}

export const getUserByEmail = async (email) => {

    return users.find(user => user.email === email);
}

export const getUserIdByEmail = async (email) => {

    const user = users.find(user => user.email === email);

    return user ? user.id : null;
}

export const getRoleByUserId = async (userId) => {

    const roleId = users.find(user => user.id === userId).roleId;

    return roles.find(role => role.id === roleId);
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

export const getUsernameByUserId = async (userId) => {

    return users.find(user => user.id === userId).username;
}

export const searchUsersByUsername = async (q) => {

    q = q.toLowerCase();

    return users.map(user => {
        const username = user.username.toLowerCase();
        const index = username.indexOf(q);

        return {
            id: user.id,
            username: user.username,
            score: index === -1 ? Infinity : index
        };
    })
    .filter(u => u.score !== Infinity)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
}

export const getAllProfiles = async () => {

    return profiles;
}

export const getProfileByIdUser = async (userId) => {

    return profiles.find(profile => profile.userId === userId) || null;
}

export const getUserPreferencesByIdUser = async (userId) => {

    return listPreferences.find(preferences => preferences.userId === userId);
}

export const editPasswordByUserId = async (userId, password) => {

    const hashedPassword = await encryptPassword(password);

    users.find(user => user.id === userId).password = hashedPassword;
}

export const editUsernameByUserId = async (userId, username) => {

    users.find(user => user.id === userId).username = username;
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
    }
}

export const editUserPreferencesByUserId = async (

    { commentNotifications, followingNotifications, newsletterNotifications },
    userId

) => {

    const preferences = listPreferences.find(preferences => preferences.userId === userId);

    if (preferences) {

        preferences.commentNotifications = commentNotifications;
        preferences.followingNotifications = followingNotifications;
        preferences.newsletterNotifications = newsletterNotifications;
    }
}

export const verifyRegisteredEmailByUserId = async (userId) => {

    users.find(user => user.id === userId).verifiedEmail = true;
}

export const verifyPassword = async (userId, password) => {

    const user = users.find(user => user.id === userId);
    
    return await comparePassword(password, user.password);
}