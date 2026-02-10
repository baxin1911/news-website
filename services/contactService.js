import { createContactDtoForRegister } from "../dtos/contactDTO.js";
import { sendEmail } from "../utils/emailUtils.js";
import { getFullnameByUserId, getUserIdByEmail } from "./userService.js";

const contacts = [];

export const saveContact = async (body) => {

    const contactDto = createContactDtoForRegister(body);

    const userId = await getUserIdByEmail(body.email);
    contactDto.name = userId ? await getFullnameByUserId(userId) : null;

    contactDto.userId = userId ?? null;
    contactDto.ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    await sendEmail(process.env.EMAIL_CONTACT, subject, `
        <p><b>Nombre:</b> ${ contactDto.name }</p>
        <p><b>Correo:</b> ${ email }</p>
        <p>${ message }</p>
    `);

    contacts.push(contactDto);

    return { id: contactDto.id };
}