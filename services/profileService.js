let profiles = [];
let preferences = {
    commentNotifications: false,
    followingNotifications: false,
    newsletterNotifications: false,
    userId: 1
};

export const getProfileByIdUserService = async (userId) => {
    return profiles.find(p => p.id === userId) || null;
}

export const createProfileService = async (userData) => {
    
    profiles.push(userData);
}

export const updateProfileInfoService = async (displayName, profilePicture, coverPicture, name, lastName, userId) => {

    const profile = profiles.find(p => p.id === userId);

    if (profile) {
        profile.displayName = displayName;
        profile.profilePicture = profilePicture;
        profile.coverPicture = coverPicture;
        profile.name = name;
        profile.lastName = lastName;
    }
}

export const updateProfilePreferencesService = async (commentNotifications, followingNotifications, newsletterNotifications, userId) => {

    preferences.commentNotifications = commentNotifications;
    preferences.followingNotifications = followingNotifications;
    preferences.newsletterNotifications = newsletterNotifications;
    preferences.userId = userId;
}

export const getProfilePreferencesByIdUserService = async (userId) => {
    if (preferences.userId === userId) {
        return preferences;
    }
    return null;
}