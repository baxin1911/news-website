import { countReactionTotal } from "./reactionService.js";

const articles = [
    { 
        id: crypto.randomUUID(), 
        category: 1, 
        likeTotal: await countReactionTotal({ entityType: 'article', entityId: 1, reactionType: 'like' }),
        title: 'Nuevo lanzamiento de OverWatch', 
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
        id: 2, 
        category: 1, 
        likeTotal: await countReactionTotal({ entityType: 'article', entityId: 2, reactionType: 'like' }),
        title: 'Sale el nuevo juego de Hollow Knight: Silk Song',
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
        id: 3, 
        category: 1, 
        likeTotal: await countReactionTotal({ entityType: 'article', entityId: 3, reactionType: 'like' }),
        title: 'Forza Horizon 5 celebra con este nuevo DLC',
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
        id: 4, 
        category: 1, 
        likeTotal: await countReactionTotal({ entityType: 'article', entityId: 4, reactionType: 'like' }),
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

export const findArticlesByCategory = async (categoryId, limit, offset = 0) => {
    const allArticles = await getAllArticles();
    const filteredArticles = allArticles.filter(article => article.category === categoryId);
    return filteredArticles.slice(offset, offset + limit);
}

export const findArticlesByQuery = async (q, limit, offset = 0) => {

    const allArticles = await getAllArticles();
    const filteredArticles = allArticles.filter(article => article.title.toLowerCase().includes(q.toLowerCase()));
    return filteredArticles.slice(offset, offset + limit);
}

export const findArticlesByTag = async (tag, limit, offset = 0) => {

    const allArticles = await getAllArticles();
    const filteredArticles = allArticles.filter(article => article.tag.toLowerCase() === tag.toLowerCase());
    return filteredArticles.slice(offset, offset + limit);
}

export const getArticleByTitle = async (title) => {

    return articles.find(article => article.title.toLowerCase() === title.toLowerCase());
}

export const existsArticleByTitle = async (title) => {

    return articles.some(article => article.title.toLowerCase() === title.toLowerCase());
}

export const existsArticleByArticleId = async (id) => {

    return articles.some(article => article.id === id);
}

export const countArticlesByQuery = async (q) => {

    const allArticles = await getAllArticles();
    const filteredArticles = allArticles.filter(article => article.title.toLowerCase().includes(q.toLowerCase()));
    return filteredArticles.length;
}

export const countArticlesByCategory = async (categoryId) => {

    const allArticles = await getAllArticles();
    const articlesByCategory = allArticles.filter(article => article.category === categoryId);
    return articlesByCategory.length;
}

export const countArticlesByTag = async (tag) => {

    const allArticles = await getAllArticles();
    const articlesByTag = allArticles.filter(article => article.tag.toLowerCase() === tag.toLowerCase());
    return articlesByTag.length;
}