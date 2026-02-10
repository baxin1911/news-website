import { successCodeMessages } from "../../messages/codeMessages.js";
import { saveContact } from "../../services/contactService.js";

export const createContact = async (req, res) => {

    const result = await saveContact(req.body);

    return res.status(201).json({
        code: successCodeMessages.CREATED_ACCOUNT,
        data: result
    });
}