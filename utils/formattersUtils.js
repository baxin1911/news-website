export const formatShortDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('es-MX', options);
}

export const formatLongDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-MX', options);
}

export const slugify = (text) => text.toLowerCase().trim().replace(/\s+/g, '-');

export const unslugify = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());