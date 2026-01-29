export const createUserPreferencesDtoForRegister = (userId) => ({

    id: crypto.randomUUID(),
    commentNotifications: false,
    followingNotifications: false,
    newsletterNotifications: false,
    userId
    
});

export const createUserPreferencesDtoForUpdate = (body) => ({

    commentNotifications: body.commentNotifications,
    followingNotifications: body.followingNotifications,
    newsletterNotifications: body.newsletterNotifications
    
});