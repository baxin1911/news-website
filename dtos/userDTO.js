import { encryptPassword } from "../utils/encryptionUtils.js";

export const createUserDtoFromGoogle = (json) => ({

    id: crypto.randomUUID(),
    username: json.name,
    email: json.email,
    verifiedEmail: json.VERIFIED_EMAIL,
    roleId: 2,
    password: null

});

export const createUserDtoForRegister = async (body = {}) => ({

    id: crypto.randomUUID(),
    username: body.username,
    email: body.email,
    verifiedEmail: false,
    roleId: 2,
    password: await encryptPassword(body.password)

});

export const createUserDtoForToken = (id, role) => ({

    id, 
    role

});