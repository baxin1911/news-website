import { activateArticleAction } from "../../api/articleApi.js";
import { activateCommentAction, sendComment } from "../../api/commentApi.js";
import { searchUsers } from "../../api/userApi.js";
import { useForm } from "../../core/forms/form.js";
import { articleCommentValidators } from "../../core/validations/validators.js";
import { initFormCommentQuill } from "../../plugins/quill/articleQuill.js";
import { initFormCommentTribute } from "../../plugins/tribute/articleTribute.js";
import { getOppositeAction, updateButtonState } from "../../ui/buttonUI.js";
import { on } from "../../utils/domUtils.js";
import { formatLongDate, formatRelativeDate } from "../../utils/formatters.js";

const profile = JSON.parse(document.getElementById('user-data').textContent);

if (profile) {

    const maxLength = 500;
    const quill = initFormCommentQuill('#editor');
    quill.on('text-change', () => {

        const text = quill.getText().trim();

        if (text.length > maxLength) quill.deleteText(maxLength, quill.getLength());

        const len = quill.getText().trim().length;
        document.getElementById('counter').innerText = `${ len } / ${ maxLength }`;
    });

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

    const appendComment = (comment) => {
        
        const list = document.getElementById('commentList');
        const li = document.createElement('li');

        li.id = `comment-${ comment.id }`;
        li.className = 'bg-comment list-group-item px-3 rounded-3 list-group-item-primary mb-2';

        const header = document.createElement('div');
        header.className = 'd-inline-flex align-items-center gap-2';

        const link = document.createElement('a');
        link.href = `/profile/${ escapeHTML(profile.username) }`;
        link.className = 'text-decoration-none';

        const img = document.createElement('img');
        img.src = profile.avatarPath || '/upload/avatar.jpg';
        img.className = 'rounded-circle me-2';
        img.width = 32;
        img.height = 32;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'fw-bold';
        nameSpan.textContent = profile.name || profile.username || 'Usuario';

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

    useForm({
        selector: '#commentForm',
        validators: articleCommentValidators,
        normalizeData: (form, data) => data.message = quill.root.innerHTML,
        sendRequest: (data, options) => sendComment(data, options),
        onSuccess: {
            appendComment: (comment) => appendComment(comment)
        }
    });

    initFormCommentTribute({
        element: quill.root, 
        selectTemplate: (item, tribute) => {

            if (!item || !item.original) return '';

            const range = quill.getSelection(true);

            if (!range) return '';

            const mentionText = tribute.current.mentionText;
            const startPos = range.index - mentionText.length - 1;

            if (startPos < 0) return '';
            
            quill.insertEmbed(range.index, 'mention', {
                id: item.original.id,
                username: item.original.username
            }, 'silent');
            quill.deleteText(startPos, mentionText.length + 1, 'silent');
            quill.insertText(startPos + 1, ' ', 'silent');
            quill.setSelection(range.index + 2, 0, 'silent');

            return '';
        },
        searchFn: async (q) => new Promise(async (resolve) => 

            await searchUsers({ q }, {
                context: 'mention',
                onSuccess: {
                    showMentionedUser: (users) => resolve(users)
                },
                onError: {
                    showUndefinedUser: () => resolve([])
                }
            })
        )
    });
}

on('click', '.article-action-button', async (e, btn) => {

    if (btn.dataset.loading) return;

    const { action, id, type } = btn.dataset;
    const data = { action, id, type };
    const options = {
        context: 'action',
        onError: {
            showButtonError: () => btn.classList.add('btn-error')
        },
        onSuccess: {
            updateBookmark: (isSaved) => {

                const span = btn.querySelector('span');

                if (span) span.textContent = isSaved ? 'Guardado' : 'Guardar';

                updateButtonState(btn, {
                    isActive: isSaved,
                    icon: 'fa-bookmark',
                    solid: isSaved
                });

                delete btn.dataset.loading;
                btn.blur();
            },
            updateCount: (result) => {

                updateButtonState(btn, {
                    isActive: result.isActive,
                    delta: result.delta,
                    icon: action === 'like' ? 'fa-thumbs-up' : 'fa-thumbs-down',
                    solid: action === 'like' ? result.isLiked : result.isDisliked
                });

                const oppsiteAction = getOppositeAction(action);
                const oppositeBtn = document.querySelector(`button[data-action="${ oppsiteAction }"][data-type="${ type }"][data-id="${ id }"]`);

                if (oppositeBtn) updateButtonState(oppositeBtn, {
                    isActive: false,
                    delta: result.oppositeDelta,
                    icon: oppositeBtn.dataset.action === 'dislike' ? 'fa-thumbs-down' : 'fa-thumbs-up',
                    solid: false
                });

                delete btn.dataset.loading;
                btn.blur();
            }
        }
    };
    const handlers = {
        article: activateArticleAction,
        comment: activateCommentAction
    };
    btn.dataset.loading = true;

    await handlers[type](data, options);
});

on('click', 'a span[data-copy]', (e, span) => {

    if (span.dataset.copy) {

        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
    }
});