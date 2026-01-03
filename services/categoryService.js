export const getAllCategoriesService = async () => {

    const categories = [];
    categories.push(...[
        { id: 1, name: 'gamming' },
        { id: 2, name: 'entertainment' },
        { id: 3, name: 'sports' },
        { id: 4, name: 'technology' }
    ]);

    return categories;
}