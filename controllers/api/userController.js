import { createSearchDtoForUsernameSearch } from "../../dtos/searchDTO.js";
import { successCodeMessages } from "../../messages/codeMessages.js";
import { searchUsersByUsername } from "../../services/userService.js";

export const searchUser = async (req, res) => {

    const searchDto = createSearchDtoForUsernameSearch(req.query.q);

    const users = await searchUsersByUsername(searchDto);

    return res.status(200).json({ 
        code: successCodeMessages.SUCCESS_MENTIONED_USER, 
        users 
    });
}