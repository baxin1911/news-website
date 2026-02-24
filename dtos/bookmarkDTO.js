export const createBookmarkDto = (userId, articleId) => ({
    id: crypto.randomUUID(),
    userId,
    articleId
});