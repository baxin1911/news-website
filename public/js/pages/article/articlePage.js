import { on } from "../../utils/domUtils.js";
import { initCommentActions } from "./comments/commentActions.js";
import { initComments } from "./comments/index.js";

const profile = JSON.parse(document.getElementById('user-data').textContent);

if (profile) {

    initComments();
}

initCommentActions();

on('click', 'a span[data-copy]', (e, span) => {

    if (span.dataset.copy) {

        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
    }
});