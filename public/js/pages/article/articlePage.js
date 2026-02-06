import { activateArticleAction } from "../../api/articleApi.js";
import { activateCommentAction } from "../../api/commentApi.js";
import { initFormCommentQuill } from "../../plugins/quill/articleQuill.js";
import { initFormCommentTribute } from "../../plugins/tribute/articleTribute.js";
import { getOppositeAction, updateButtonState } from "../../ui/buttonUI.js";
import { on } from "../../utils/domUtils.js";

const maxLength = 500;
const quill = initFormCommentQuill('#editor');
quill.on('text-change', () => {

    const text = quill.getText().trim();

    if (text.length > maxLength) quill.deleteText(maxLength, quill.getLength());

    const len = quill.getText().trim().length;
    document.getElementById('counter').innerText = `${ len } / ${ maxLength }`;
});

on('submit', '#commentForm', (e, form) => {
    e.preventDefault()
    console.log(quill.root.innerHTML)
    document.getElementById('commentHiddenInput').value = quill.root.innerHTML;
});

initFormCommentTribute('editor');

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