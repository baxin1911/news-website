export const getCategory = (categoryId) => {
    switch (categoryId) {
        case 1:
            return 'Gamming';
        case 2:
            return 'Entretenimiento';
        case 3:
            return 'Negocios'
        case 4:
            return 'Educación'
        case 5:
            return 'Streaming'
        case 6:
            return 'Deportes'
        case 7:
            return 'Tecnología'
        default:
            return 'General';
    }
}