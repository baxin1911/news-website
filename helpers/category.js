export const getCategory = (categoryId) => {
    switch (categoryId) {
        case 1:
            return 'Gamming';
        case 2:
            return 'Entretenimiento';
        case 3:
            return 'Deportes'
        case 4:
            return 'Tecnología'
        default:
            return 'Sin categoría';
    }
}

export const getCategoryId = (categoryName) => {
    switch (categoryName) {
        case 'Gamming':
            return 1;
        case 'Entretenimiento':
            return 2;
        case 'Deportes':
            return 3;
        case 'Tecnología':
            return 4;
        default:
            return 'Sin categoría';
    }
}