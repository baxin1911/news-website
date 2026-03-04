import { sendEmail } from "../utils/emailUtils.js";
import { getFullnameByUserId } from "./profileService.js";
import { getUserIdByEmail } from "./userService.js";

const contacts = [];

export const saveContact = async (contactDto) => {

    const userId = await getUserIdByEmail(contactDto.email);
    contactDto.name = userId ? await getFullnameByUserId(userId) : null;

    contactDto.userId = userId ?? null;
    contactDto.ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    await sendEmail(process.env.EMAIL_CONTACT, contactDto.subject, `
        <p><b>Nombre:</b> ${ contactDto.name }</p>
        <p><b>Correo:</b> ${ contactDto.email }</p>
        <p>${ contactDto.message }</p>
    `);

    contacts.push(contactDto);

    return { id: contactDto.id };
}