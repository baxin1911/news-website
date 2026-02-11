import { activateArticleAction } from "../../api/articleApi.js";
import { activateCommentAction, sendComment } from "../../api/commentApi.js";
import { searchUsers } from "../../api/userApi.js";
import { useForm } from "../../core/forms/form.js";
import { articleCommentValidators } from "../../core/validations/validators.js";
import { initFormCommentQuill } from "../../plugins/quill/articleQuill.js";
import { initFormCommentTribute } from "../../plugins/tribute/articleTribute.js";
import { getOppositeAction, updateButtonState } from "../../ui/buttonUI.js";
import { on } from "../../utils/domUtils.js";

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

    const buildButtons = (comment) => `
        <button 
            class="btn btn-link btn-sm rounded-pill article-action-button"
            title="${comment.isLiked ? 'Gustado' : 'Dar me gusta'}"
            data-action="like"
            data-id="${comment.id}"
            data-type="comment"
        >
            <i class="${comment.isLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i>
            <span class="ms-1">${comment.likeTotal || 0}</span>
        </button>

        <button 
            class="btn btn-link btn-sm rounded-pill article-action-button"
            title="${comment.isDisliked ? 'No gustado' : 'Dar no me gusta'}"
            data-action="dislike"
            data-id="${comment.id}"
            data-type="comment"
        >
            <i class="${comment.isDisliked ? 'fa-solid' : 'fa-regular'} fa-thumbs-down"></i>
            <span class="ms-1">${comment.dislikeTotal || 0}</span>
        </button>

        <button 
            class="btn btn-link btn-sm rounded-pill"
            title="Responder"
        >
            <i class="fas fa-reply"></i>
            <span class="ms-1">${comment.replyTotal || 0}</span>
        </button>
    `;

    const appendComment = (comment) => {
        const list = document.getElementById('commentList');
        const li = document.createElement('li');
        li.id = `comment-${comment.id}`;
        li.className = 'bg-comment list-group-item px-3 rounded-3 list-group-item-primary mb-2';

        const username = escapeHTML(profile.username);
        const name = escapeHTML(profile.name || profile.username || 'Usuario');

        li.innerHTML = `
            <div class="d-inline-flex align-items-center gap-2">
                <a href="/profile/${username}" class="text-decoration-none">
                    <img 
                        src="${profile.avatarPath || '/upload/avatar.jpg'}"
                        class="rounded-circle me-2"
                        width="32"
                        height="32"
                    />
                    <span class="fw-bold">${name}</span>
                </a>

                <span class="text-muted">·</span>

                <span class="fs-6" title="${escapeHTML(comment.createdLong)}">
                    ${escapeHTML(comment.createdRelative)}
                </span>
            </div>

            <p class="text-dark py-1 px-3 px-md-4 px-lg-5">
                ${comment.description}
            </p>

            <div class="d-flex flex-wrap gap-3">
                ${buildButtons(comment)}
            </div>
        `;

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

            const range = quill.getSelection(true);

            if (!range) return '';

            const mentionText = tribute.current.mentionText;
            const startPos = range.index - mentionText.length - 1;
            quill.insertEmbed(range.index, 'mention', {
                id: item.original.id,
                username: item.original.username
            });
            quill.deleteText(startPos, mentionText.length + 1);
            quill.insertText(startPos + 1, ' ');
            quill.setSelection(range.index + 1);

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