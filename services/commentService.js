import { getAllArticles } from "./articleService.js";
import { countReactionTotal } from "./reactionService.js";
import { getAllProfiles } from "./userService.js";

const comments = [
    { 
        id: 1, 
        replyCount: 0, 
        dislikeTotal: await countReactionTotal({ entityType: 'comment', entityId: 1, reactionType: 'dislike' }), 
        likeTotal: await countReactionTotal({ entityType: 'comment', entityId: 1, reactionType: 'like' }), 
        isLiked: false,
        isDisliked: false,
        description: 'Meh', 
        articleId: await getAllArticles().then(articles => articles[0].id),
        articleTitle: await getAllArticles().then(articles => articles[0].title),
        page: 1,
        userId: await getAllProfiles().then(profiles => profiles[0] ? profiles[0].id : null),
        username: await getAllProfiles().then(profiles => profiles[0] ? profiles[0].username : 'Usuario'),
        userAvatarPath: await getAllProfiles().then(profiles => profiles[0] ? profiles[0].avatar : null),
        created_at: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 
    },
    { 
        id: 2, 
        replyCount: 1, 
        dislikeTotal: await countReactionTotal({ entityType: 'comment', entityId: 2, reactionType: 'dislike' }), 
        likeTotal: await countReactionTotal({ entityType: 'comment', entityId: 2, reactionType: 'like' }), 
        isLiked: false,
        isDisliked: false,
        description: 'Por fin ha llegado. Ahora si le dedicare todo el tiempo necesario.', 
        articleId: await getAllArticles().then(articles => articles[1].id),
        articleTitle: await getAllArticles().then(articles => articles[1].title),
        page: 1,
        userId: 1,
        username: 'Alberto Galindo',
        userAvatarPath: await getAllProfiles().then(profiles => profiles[1] ? profiles[1].avatar : null),
        created_at: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 
    },
    { 
        id: 3, 
        replyCount: 3, 
        dislikeTotal: await countReactionTotal({ entityType: 'comment', entityId: 3, reactionType: 'dislike' }), 
        likeTotal: await countReactionTotal({ entityType: 'comment', entityId: 3, reactionType: 'like' }), 
        isLiked: false,
        isDisliked: false,
        description: 'He visto muchas reseñas sobre este juego, pero ahora estoy decidido a comprarlo', 
        articleId: await getAllArticles().then(articles => articles[2].id),
        articleTitle: await getAllArticles().then(articles => articles[2].title),
        page: 1,
        userId: 1,
        username: 'Alberto Galindo',
        userAvatarPath: await getAllProfiles().then(profiles => profiles[1] ? profiles[1].avatar : null),
        created_at: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 
    },
];

export const findCommentsByArticleId = async (articleId, limit, offset = 0) => {
    const filteredComments = comments.filter(comment => comment.articleId === articleId);
    return filteredComments.slice(offset, offset + limit);
}

export const findCommentsByUserId = async (userId, limit, offset = 0) => {

    const filteredComments = comments.filter( comment => comment.userId === userId );
    return filteredComments.slice(offset, offset + limit);
}

export const countCommentsByArticleId = async (articleId) => {

    return comments.filter(comment => comment.articleId === articleId ).length;
}

export const countCommentsByUserId = async (userId) => {

    return comments.filter(comment => comment.userId === userId ).length;
}

export const existsCommentByCommentId = async (id) => {

    return comments.some(comment => comment.id === id);
}