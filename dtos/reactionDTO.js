export const createReactionDtoForCommentLike = (userId, entityId) => ({
    entityType: 'comment',
    reactionType: 'like',
    userId,
    entityId
});

export const createReactionDtoForCommentDislike = (userId, entityId) => ({
    entityType: 'comment',
    reactionType: 'dislike',
    userId,
    entityId
});

export const createReactionDtoForArticleLike = (userId, entityId) => ({
    entityType: 'article',
    reactionType: 'like',
    userId,
    entityId
});