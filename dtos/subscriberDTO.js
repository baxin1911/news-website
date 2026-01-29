export const createSubscriberDtoForRegister = (email) => ({
    id: crypto.randomUUID(),
    email,
    status: 'activo',
});