import { searchUsersRequest } from "../../api/userApi.js";

export const searchUsers = async (q) => {

    try {

        const response = await searchUsersRequest({ q });

        return {
            users: response.data.users
        };

    } catch (error) {

        throw error;
    }
}