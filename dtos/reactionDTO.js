export const createReactionDtoForRegister = (body) => ({
    entityType: body.entityType,
    reactionType: body.reactionType,
    userId: body.userId,
    entityId: body.entityId
});

export const createReactionDtoForArticleLike = (userId, articleId) => ({
    entityType: 'article',
    reactionType: 'like',
    userId,
    articleId
});