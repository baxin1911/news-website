import { successCodeMessages } from "../../messages/codeMessages.js";
import { saveNewsletterSubscriber } from "../../services/newsletterService.js";

export const subscribeToNewsletter = async (req, res) => {

    const result = await saveNewsletterSubscriber(req.body);

    return res.status(202).json({ 
        code: successCodeMessages.SENDED_NEWSLETTER_EMAIL,
        data: result
    });
}