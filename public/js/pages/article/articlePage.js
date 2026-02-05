import { activateArticleAction } from "../../api/articleApi.js";
import { activateCommentAction } from "../../api/commentApi.js";
import { getOppositeAction, updateButtonState } from "../../ui/buttonUI.js";
import { on } from "../../utils/domUtils.js";

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