let profiles = [];
let preferences = {
    commentNotifications: false,
    followingNotifications: false,
    newsletterNotifications: false,
    userId: 1
};

export const getProfileByIdUser = async (userId) => {
    return profiles.find(p => p.id === userId) || null;
}

export const createProfile = async (userData) => {
    
    profiles.push(userData);
}

export const updateProfileInfo = async (displayName, profilePicture, coverPicture, name, lastName, userId) => {

    const profile = profiles.find(p => p.id === userId);

    if (profile) {
        profile.displayName = displayName;
        profile.profilePicture = profilePicture;
        profile.coverPicture = coverPicture;
        profile.name = name;
        profile.lastName = lastName;
    }
}

export const updateProfilePreferences = async (commentNotifications, followingNotifications, newsletterNotifications, userId) => {

    preferences.commentNotifications = commentNotifications;
    preferences.followingNotifications = followingNotifications;
    preferences.newsletterNotifications = newsletterNotifications;
    preferences.userId = userId;
}

export const getProfilePreferencesByIdUser = async (userId) => {
    if (preferences.userId === userId) {
        return preferences;
    }
    return null;
}