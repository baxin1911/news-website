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

export const saveUser = async (userDto) => {

    users.push(userDto);
    
    return userDto.id;
}

export const getAllUsers = async () => {

    return users;
}

export const findUsersByUserId = async (id) => {

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

export const getUsernameByUserId = async (userId) => {

    return users.find(user => user.id === userId).username;
}

export const searchUsersByUsername = async (searchDto) => {

    const { q, limit, offset } = searchDto;
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
    .slice(offset, offset + limit);
}

export const editPasswordByUserId = async (userId, password) => {

    const hashedPassword = await encryptPassword(password);

    users.find(user => user.id === userId).password = hashedPassword;

    return true;
}

export const editUsernameByUserId = async (userId, username) => {

    users.find(user => user.id === userId).username = username;

    return true;
}

export const verifyRegisteredEmailByUserId = async (userId) => {

    users.find(user => user.id === userId).verifiedEmail = true;
}

export const verifyPassword = async (userId, password) => {

    const user = users.find(user => user.id === userId);
    
    return await comparePassword(password, user.password);
}