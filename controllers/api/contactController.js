import { successCodeMessages } from "../../messages/codeMessages.js";
import { sendEmail } from "../../utils/emailUtils.js";

export const createContact = async (req, res) => {

    const { name, email, subject, message } = req.body;

    //save contact
    // const result = await saveContact(name, email, subject, message);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 429, 500

    await sendEmail(process.env.EMAIL_CONTACT, subject, `
        <p><b>Nombre:</b> ${ name }</p>
        <p><b>Correo:</b> ${ email }</p>
        <p>${ message }</p>
    `);

    return res.status(201).json({ code: successCodeMessages.CREATED_CONTACT });
}