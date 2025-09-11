import { transporter } from "../config/email.js";

export const sendEmail = async (to, subject, html) => {

    await transporter.sendMail({
        from: `Mi App <${process.env.EMAIL_USER}`,
        to,
        subject,
        html
    });
}