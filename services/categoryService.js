export const getAllCategories = async () => {

    const categories = [
        { id: null, name: 'Todas' }
    ];

    categories.push(...[
        { id: 1, name: 'Gamming' },
        { id: 2, name: 'Entretenimiento' },
        { id: 3, name: 'Deportes' },
        { id: 4, name: 'Tecnología' }
    ]);

    return categories;
}