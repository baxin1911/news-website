export const createCommentDtoForRegister = (body) => ({
    id: crypto.randomUUID(),
    articleId: body.articleId,
    parentId: body.parentId || null,
    userId: body.userId
});