export const findTopTagNames = async () => {

    const tags = [
        { id: 1, name: 'Xbox' },
        { id: 2, name: 'Silent Hill' },
        { id: 3, name: 'Resident Evil Village' },
        { id: 4, name: 'PlayStation' },
        { id: 5, name: 'Hollow Knight' },
        { id: 6, name: 'Mario Kart' },
        { id: 7, name: 'Forza Horizon 5' },
        { id: 8, name: 'Animal Crossing' }
    ];

    return tags.map(tag => tag.name);
}

export const existsTagByName = async (name) => {

    const tags = [
        { id: 1, name: 'Xbox' },
        { id: 2, name: 'Silent Hill' },
        { id: 3, name: 'Resident Evil Village' },
        { id: 4, name: 'PlayStation' },
        { id: 5, name: 'Hollow Knight' },
        { id: 6, name: 'Mario Kart' },
        { id: 7, name: 'Forza Horizon 5' },
        { id: 8, name: 'Animal Crossing' }
    ];

    return tags.some(tag => tag.name === name);
}