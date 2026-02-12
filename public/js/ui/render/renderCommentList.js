import { formatLongDate, formatRelativeDate } from "../../utils/formatters.js";

const escapeHTML = (str = '') => {
    const div = document.createElement('div');
    div.textContent = str;

    return div.innerHTML;
};

const buildCommentButton = (actionButton) => {

    const button = document.createElement('button');

    button.type = 'button';
    button.id = actionButton.id;
    button.className = `${ actionButton.class }${ actionButton.isToggle ? ' article-action-button' : '' }`;
    button.setAttribute('data-mdb-ripple-init', '');
    button.setAttribute('title', actionButton.title);
    button.setAttribute('data-mdb-tooltip-init', '');
    button.setAttribute('data-mdb-placement', 'top');

    if (actionButton.isToggle && actionButton.data) {

        button.setAttribute('data-action', actionButton.data.action);
        button.setAttribute('data-id', actionButton.data.entityId);
        button.setAttribute('data-type', actionButton.data.entityType);
        button.setAttribute('data-mdb-toggle', 'button');
    }

    const icon = document.createElement('i');
    icon.className = actionButton.iconClass;

    const value = document.createElement('span');
    value.className = 'ms-1';
    value.textContent = actionButton.value ?? 0;

    button.appendChild(icon);
    button.appendChild(value);

    return button;
}

export const appendComment = (comment, profile, quill) => {
    
    const list = document.getElementById('commentList');
    const li = document.createElement('li');

    li.id = `comment-${ comment.id }`;
    li.className = 'bg-comment list-group-item px-3 rounded-3 list-group-item-primary mb-2';

    const header = document.createElement('div');
    header.className = 'd-inline-flex align-items-center gap-2';

    const link = document.createElement('a');
    link.href = `/profile/${ escapeHTML(comment.author.username) }`;
    link.className = 'text-decoration-none';

    const img = document.createElement('img');
    img.src = comment.author.avatarPath || '/upload/avatar.jpg';
    img.className = 'rounded-circle me-2';
    img.width = 32;
    img.height = 32;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'fw-bold';
    nameSpan.textContent = comment.author.name || comment.author.username || 'Usuario';

    link.append(img, nameSpan);

    const dot = document.createElement('span');
    dot.className = 'text-muted';
    dot.textContent = '·';

    const time = document.createElement('span');
    time.className = 'fs-6';
    time.title = formatLongDate(comment.created_at);
    time.textContent = formatRelativeDate(comment.created_at);

    header.append(link, dot, time);

    const p = document.createElement('p');
    p.className = 'text-dark py-1 px-3 px-md-4 px-lg-5';
    p.innerHTML = comment.message;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'd-flex flex-wrap gap-3';

    buttonWrapper.append(
        buildCommentButton({
            id: `like-${ comment.id }`,
            class: 'btn btn-link btn-sm rounded-pill',
            title: comment.isLiked ? 'Gustado' : 'Dar me gusta',
            data: { 
                action: 'like', 
                entityId: comment.id, 
                entityType: 'comment' 
            },
            iconClass: `${ comment.isLiked ? 'fa-solid' : 'fa-regular' } fa-thumbs-up`,
            value: comment.likeTotal || 0,
            isToggle: true
        }),
        buildCommentButton({
            id: `dislike-${ comment.id }`,
            class: 'btn btn-link btn-sm rounded-pill',
            title: comment.isDisliked ? 'No gustado' : 'Dar no me gusta',
            data: { 
                action: 'dislike', 
                entityId: comment.id, 
                entityType: 'comment' 
            },
            iconClass: `${ comment.isDisliked ? 'fa-solid' : 'fa-regular' } fa-thumbs-down`,
            value: comment.dislikeTotal || 0,
            isToggle: true
        }),
        buildCommentButton({
            id: `reply-${ comment.id }`,
            class: 'btn btn-link btn-sm rounded-pill',
            title: 'Responder',
            data: null,
            iconClass: 'fas fa-reply',
            value: comment.replyTotal || 0,
            isToggle: false
        })
    );

    li.append(header, p, buttonWrapper);
    list.prepend(li);

    if (list.children.length > 10) list.lastElementChild.remove();

    quill.setText('');
}