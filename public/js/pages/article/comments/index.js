import { initCommentForm } from "./commentForm.js";
import { initEditor } from "./editor.js"
import { initMentions } from "./mentions.js";

export const initComments = () => {

    const quill = initEditor();
    initMentions(quill);
    initCommentForm(quill);
}