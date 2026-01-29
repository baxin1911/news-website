export const createContactDtoForRegister = (body) => ({
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message
});