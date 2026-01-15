export const getAllArticles = async () => {

    const articles = [
        { idArticle: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 }
    ];

    return articles;
}

export const findArticlesByCategory = async (categoryId) => {
    const allArticles = await getAllArticles();
    return allArticles.filter(article => article.category === categoryId);
}

export const findArticlesByQuery = async (q) => {

    const articles = [
        { idArticle: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 }
    ];

    return articles;
}

export const findArticlesByTag = async (tag) => {

    const articles = [
        { idArticle: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 }
    ];

    return articles;
}

export const getArticleByTitle = (title) => {

    const articles = [
        { 
            idArticle: 1, 
            category: 1, 
            title: 'Nuevo lanzamiento de autos en Forza Horizon 5', 
            tag: 'Forza Horizon 5', 
            author: 'Raul Peredo', 
            description: 'Esta descripcin es un ejemplo de texto largo', 
            publicationDate: new Date(), 
            blocks: [
                { type: 'paragraph', content: 'fhgguihk' },
                { type: 'image', content: '/upload/news/ejemplo.png' }
            ],
            status: 1 
        },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 3', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 4', imageUrls: ['/upload/news/ejemplo.png'], status: 1 }
    ];

    return articles.find(article => article.title.toLowerCase() === title.toLowerCase());
}

export const existsArticleByTitle = (title) => {

    const articles = [
        { 
            idArticle: 1, 
            category: 1, 
            title: 'Nuevo lanzamiento de autos en Forza Horizon 5', 
            tag: 'Forza Horizon 5', 
            author: 'Raul Peredo', 
            description: 'Esta descripcin es un ejemplo de texto largo', 
            publicationDate: new Date(), 
            blocks: [
                { type: 'paragraph', content: 'fhgguihk' },
                { type: 'image', content: '/upload/news/ejemplo.png' }
            ],
            status: 1 
        },
        { idArticle: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 3', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: ['/upload/news/ejemplo.png'], status: 1 },
        { idArticle: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 4', imageUrls: ['/upload/news/ejemplo.png'], status: 1 }
    ];

    return articles.some(article => article.title.toLowerCase() === title.toLowerCase());
}