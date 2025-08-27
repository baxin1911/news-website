export const validateSelectedOrdering = (ordering) => {

    return !ordering ? 'Selecciona un orden' : null;
}

export const validateStartDate = (startDate) => {

    if (new Date(startDate) === 'Invalid Date') {
        return 'El formato de la fecha de inicio es inválido';
    }

    return null;
}

export const validateEndDate = (endDate) => {

    if (new Date(endDate) === 'Invalid Date') {
        return 'El formato de la fecha de fin es inválido';
    }

    return null;
}

export const validateDateRange = (startDate, endDate) => {

    if (!startDate && !endDate) {
        if (startDate > endDate) {
            return 'La fecha de inicio no puede ser mayor que la fecha de fin';
        }
    }

    return null;
}
