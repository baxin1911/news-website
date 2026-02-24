import { createSubscriberDtoForRegister } from "../dtos/subscriberDTO.js";
import { sendEmail } from "../utils/emailUtils.js";
import { saveSubscriber } from "./subscriberService.js";

export const saveNewsletterSubscriber = async (subscriberDto) => {

    await sendEmail(subscriberDto.email, '¡Gracias por suscribirte a nuestro boletín!',`
        <p>Aquí estan las últimas noticias del día.</p>
    `);

    await saveSubscriber(subscriberDto);

    return { id: subscriberDto.id };
}