export const getAllNotices = async () => {

    const notices = [
        { idNotice: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: 'example.jpg', status: 1 },
        { idNotice: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: 'example.jpg', status: 1 },
        { idNotice: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: 'example.jpg', status: 1 },
        { idNotice: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: 'example.jpg', status: 1 }
    ];

    return notices;
}

export const getNoticesByCategory = async (categoryId) => {
    const allNotices = await getAllNotices();
    return allNotices.filter(notice => notice.category === categoryId);
}