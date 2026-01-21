const articles = [
    { 
        idArticle: 1, 
        category: 1, 
        title: 'Nuevo lanzamiento de autos en Forza Horizon 5', 
        coverPath: '/upload/news/ejemplo.png',
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
    { 
        idArticle: 2, 
        category: 1, 
        title: 'Este título es un ejemplo de texto largo 3',
        coverPath: '/upload/news/ejemplo.png',
        tag: 'Preview',
        author: 'Eden Morales',
        description: 'Esta descripción es un ejemplo de texto largo', 
        publicationDate: new Date(),  
        blocks: [
            { type: 'paragraph', content: 'fhgguihk' },
            { type: 'image', content: '/upload/news/ejemplo.png' }
        ],
        status: 1 
    },
    { 
        idArticle: 3, 
        category: 1, 
        title: 'Este título es un ejemplo de texto largo 2',
        coverPath: '/upload/news/ejemplo.png',
        tag: 'Opinión',
        author: 'Yahir Meneses',
        description: 'Esta descripción es un ejemplo de texto largo 2', 
        publicationDate: new Date(),  
        blocks: [
            { type: 'paragraph', content: 'fhgguihk' },
            { type: 'image', content: '/upload/news/ejemplo.png' }
        ],
        status: 1 
    },
    { 
        idArticle: 4, 
        category: 1, 
        title: 'Este título es un ejemplo de texto largo 4',
        coverPath: '/upload/news/ejemplo.png',
        tag: 'Xbox',
        author: 'Jaime Gonzalez',
        description: 'Esta descripción es un ejemplo de texto largo 4', 
        publicationDate: new Date(),  
        blocks: [
            { type: 'paragraph', content: 'fhgguihk' },
            { type: 'image', content: '/upload/news/ejemplo.png' }
        ],
        status: 1 
    },
];

export const getAllArticles = async () => {

    return articles;
}

export const findArticlesByCategory = async (categoryId) => {
    const allArticles = await getAllArticles();
    return allArticles.filter(article => article.category === categoryId);
}

export const findArticlesByQuery = async (q) => {

    return articles;
}

export const findArticlesByTag = async (tag) => {

    return articles;
}

export const getArticleByTitle = (title) => {

    return articles.find(article => article.title.toLowerCase() === title.toLowerCase());
}

export const existsArticleByTitle = (title) => {

    return articles.some(article => article.title.toLowerCase() === title.toLowerCase());
}