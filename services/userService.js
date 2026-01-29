import { encryptPassword } from "../utils/encryptionUtils.js";

let users = [];

let roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 1, name: 'author' },
]

const profiles = [
    {
        id: 2,
        email: 'dersey@example.com',
        verifiedEmail: true,
        username: 'frontierZone',
        code: 'AA000001',
        role: 1,
        avatarPath: '/img/ejemplo.png',
        coverPath: null,
        totalPosts: 0,
        totalTopics: 0,
        totalAuthors: 0,
        followers: 0
    }
];

const listPreferences = [];

const contacts = [];

export const saveProfile = async (userData) => {
    
    profiles.push(userData);
}

export const saveUser = async (user) => {

    users.push(user);
    
    return user.id;
}

export const saveUserPreferences = async (preferences) => {

    listPreferences.push(preferences);
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

export const findUserByEmail = async (email) => {

    return users.includes(user => user.email === email);
}

export const getUserIdByEmail = async (email) => {

    return users.find(user => user.email === email).id;
}

export const getRoleNameByUserId = async (userId) => {

    const roleId = users.find(user => user.id === userId).roleId;

    return roles.find(role => role.id === roleId).name;
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

export const getRoleByEmail = async (email) => {

    const roleId = users.find(user => user.email === email).roleId;

    return roles.find(role => role.id === roleId);
}

export const getUsernameByUserId = async (userId) => {

    return users.find(user => user.id === userId).username;
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
    
    const hashedPassword = await encryptPassword(password);
    
    return users.find(user => user.id === userId).password === hashedPassword;
}