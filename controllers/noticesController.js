export const getAllNotices = async () => {

    const notices = [
        { idNotice: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: 'example.jpg', status: 1 }
    ];

    return notices;
}