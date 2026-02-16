const infoMessages = {
    NO_CONTENT_SEARCH: 'No se encontraron resultados. Pruebe otro término.'
}

export const getInfoMessage = (code) => infoMessages[code] ?? null;