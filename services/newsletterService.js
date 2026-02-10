import { createSubscriberDtoForRegister } from "../dtos/subscriberDTO.js";
import { sendEmail } from "../utils/emailUtils.js";

export const saveNewsletterSubscriber = async (body) => {

    const subscriberDto = createSubscriberDtoForRegister(body.email);

    await sendEmail(email, '¡Gracias por suscribirte a nuestro boletín!',`
        <p>Aquí estan las últimas noticias del día.</p>
    `);

    return { id: subscriberDto.id };
}