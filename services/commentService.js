export const getCommentsByIdUserService = async (id) => {

    const comments = [
        { id: 1, replyCount: 0, dislikeCount: 0, likeCount: 0, description: 'Meh', article: { title: 'Nuevo lanzamiento de OverWatch' }, created_at: '22/10/2025 18:45:33' },
        { id: 2, replyCount: 1, dislikeCount: 0, likeCount: 2, description: 'Por fin ha llegado. Ahora si le dedicare todo el tiempo necesario.', article: { title: 'Forza Horizon celebra con este nuevo DLC.' }, created_at: '12/12/2025 22:00:19' },
        { id: 3, replyCount: 3, dislikeCount: 0, likeCount: 19, description: 'He visto muchas reseñas sobre este juego, pero ahora estoy decidido a comprarlo', article: { title: 'Sale el nuevo juego de Hollow Knight: Silk Song' }, created_at: '08/09/2025 08:27:57' },
    ];

    return comments;
}