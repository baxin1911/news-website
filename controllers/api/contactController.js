import { createContactDtoForRegister } from "../../dtos/contactDTO.js";
import { successCodeMessages } from "../../messages/codeMessages.js";
import { getFullnameByUserId, getUserIdByEmail, saveContact } from "../../services/userService.js";
import { sendEmail } from "../../utils/emailUtils.js";

export const createContact = async (req, res) => {

    const { body } = req;
    const { email } = body;
    const contactDto = createContactDtoForRegister(body);
    const userId = await getUserIdByEmail(email);
    contactDto.name = userId ? await getFullnameByUserId(userId) : null;
    contactDto.userId = userId ?? null;
    contactDto.ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    
    await saveContact(contactDto);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 429, 500

    await sendEmail(process.env.EMAIL_CONTACT, subject, `
        <p><b>Nombre:</b> ${ name }</p>
        <p><b>Correo:</b> ${ email }</p>
        <p>${ message }</p>
    `);

    return res.status(201).json({ code: successCodeMessages.CREATED_CONTACT });
}