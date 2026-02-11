import { successCodeMessages } from "../../messages/codeMessages.js";
import { searchUsersByUsername } from "../../services/userService.js";

export const searchUser = async (req, res) => {

    const { q } = req.query;

    const users = await searchUsersByUsername(q);

    return res.status(200).json({ code: successCodeMessages.SUCCESS_MENTIONED_USER, users });
}