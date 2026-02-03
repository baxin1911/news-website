import { activateArticleAction } from "../../api/articleApi.js";
import { activateCommentAction } from "../../api/commentApi.js";
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
            updateCount: (result) => {

                const span = btn.querySelector('span');

                if (span) {
                    
                    const current = Number(span.textContent) || 0;
                    span.textContent = current + result.delta;
                }

                btn.classList.toggle('active', result.isActive);
                btn.setAttribute('aria-pressed', result.isActive);
                const oppsiteAction = action === 'like' ? 'dislike' : 'like';
                const oppositeBtn = document.querySelector(`button[data-action="${ oppsiteAction }"][data-type="${ type }"][data-id="${ id }"]`);

                if (oppositeBtn) {

                    const oppositeSpan = oppositeBtn.querySelector('span');

                    if (oppositeSpan) {
                        
                        const oppositeCurrent = Number(oppositeSpan.textContent) || 0;
                        oppositeSpan.textContent = oppositeCurrent + result.oppositeDelta;
                    }

                    oppositeBtn.classList.remove('active');
                    oppositeBtn.setAttribute('aria-pressed', false);
                }

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