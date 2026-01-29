import { createSubscriberDtoForRegister } from "../../dtos/subscriberDTO.js";
import { successCodeMessages } from "../../messages/codeMessages.js";
import { saveNewsletterSubscriber } from "../../services/newsletterService.js";
import { sendEmail } from "../../utils/emailUtils.js";

export const subscribeToNewsletter = async (req, res) => {

    const { email } = req.body || {};

    const subscriberDto = createSubscriberDtoForRegister(email);

    await saveNewsletterSubscriber(subscriberDto);

    await sendEmail(email, '¡Gracias por suscribirte a nuestro boletín!',`
        <p>Aquí estan las últimas noticias del día.</p>
    `);

    // if (result.error) return res.status(500).json({ message: result.error });

    // 403, 429, 500

    return res.status(202).json({ code: successCodeMessages.SENDED_NEWSLETTER_EMAIL });
}