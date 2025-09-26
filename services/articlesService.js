export const getAllArticles = async () => {

    const articles = [
        { idArticle: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/img/ejemplo.png'], status: 1 },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/img/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/img/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/img/ejemplo.png'], status: 1 }
    ];

    return articles;
}

export const getArticlesByCategory = async (categoryId) => {
    const allArticles = await getAllArticles();
    return allArticles.filter(article => article.category === categoryId);
}

export const searchArticles = async (q) => {

    const articles = [
        { idArticle: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/img/ejemplo.png'], status: 1 },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/img/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/img/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/img/ejemplo.png'], status: 1 }
    ];

    return articles;
}