export const validateQuery = (q) => {

    return (!q || (q.trim() === '')) ? 'Este campo es obligatorio' : null;
}