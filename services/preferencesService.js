import { getAllUsers } from "./userService.js";

const listPreferences = [
    {
        id: crypto.randomUUID(),
        commentNotifications: false,
        followingNotifications: true,
        newsletterNotifications: false,
        userId: await getAllUsers().then(users => users[0]?.id ?? null)
    }
];

export const saveUserPreferences = async (preferencesDto) => {

    listPreferences.push(preferencesDto);
}

export const getUserPreferencesByUserId = async (userId) => {

    return listPreferences.find(preferences => preferences.userId === userId);
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

        return true;
    }

    return false;
}