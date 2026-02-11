export const createCommentDtoForRegister = (body) => ({
    id: crypto.randomUUID(),
    articleId: body.articleId,
    parentId: body.parentId || null,
    userId: body.userId,
    message: body.message,
    created_at: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 
});