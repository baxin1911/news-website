export const createReactionDtoForComment = (userId, params) => ({
    entityType: 'comment',
    reactionType: params.action,
    userId,
    entityId: params.id
});

export const createReactionDtoForArticle = (userId, params) => ({
    entityType: 'article',
    reactionType: params.action,
    userId,
    articleId: params.id
});