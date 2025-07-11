export function getCategory(category) {
    switch (category) {
        case '1':
            return 'Gaming';
        case '2':
            return 'Naturaleza';
        case '3':
            return 'Negocios'
        case '4':
            return 'Educación'
        case '5':
            return 'Comida'
        case '6':
            return 'Viajes'
        case '7':
            return 'Tecnologia'
        case '8':
            return 'Deportes'
        default:
            return undefined;
    }
}