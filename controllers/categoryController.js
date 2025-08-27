export const getAllCategories = async () => {

    const categories = [
        { id: null, name: 'Todas' }
    ];

    categories.push(...[
        { id: 1, name: 'Gamming' },
        { id: 2, name: 'Entretenimiento' },
        { id: 3, name: 'Negocios' },
        { id: 4, name: 'Educación' },
        { id: 5, name: 'Streaming' },
        { id: 6, name: 'Deportes' },
        { id: 7, name: 'Tecnología' },
        { id: 8, name: 'General' }
    ]);

    return categories;
}