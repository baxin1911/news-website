import { createContactDtoForRegister } from "../../dtos/contactDTO.js";
import { successCodeMessages } from "../../messages/codeMessages.js";
import { saveContact } from "../../services/contactService.js";

export const createContact = async (req, res) => {

    const contactDto = createContactDtoForRegister(req.body);
    const result = await saveContact(contactDto);

    return res.status(201).json({
        code: successCodeMessages.CREATED_ACCOUNT,
        result
    });
}