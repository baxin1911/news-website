import { createSubscriberDtoForRegister } from "../../dtos/subscriberDTO.js";
import { successCodeMessages } from "../../messages/codeMessages.js";
import { saveNewsletterSubscriber } from "../../services/newsletterService.js";

export const subscribeToNewsletter = async (req, res) => {

    const newsletterDto = createSubscriberDtoForRegister(req.body.email);
    const result = await saveNewsletterSubscriber(newsletterDto);

    return res.status(202).json({ 
        code: successCodeMessages.SENDED_NEWSLETTER_EMAIL,
        data: result
    });
}