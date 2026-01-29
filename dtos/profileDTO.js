export const createProfileDtoForGoogleAuth = (json, provider) => ({ 

    id: crypto.randomUUID(),
    code: 'AA000001',
    sub: json.sub, 
    provider, 
    name: json.given_name,
    lastName: json.family_name,
    avatarPath: null,
    coverPath: null

});

export const createProfileDtoForRegister = (body = {}) => ({

    id: crypto.randomUUID(),
    code: 'AA000002',
    sub: null,
    provider: null,
    name: body.name || null,
    lastName: body.lastName || null,
    avatarPath: body.avatarPath || null,
    coverPath: body.coverPath || null

});

export const createProfileDtoForUpdate = (body = {}) => ({

    name: body.name || null,
    lastName: body.lastName || null,
    avatarPath: body.avatarPath || null,
    coverPath: body.coverPath || null
    
});