import { createQuill } from "./baseQuill.js";

export const initFormCommentQuill = (id) => {

    const Embed = Quill.import('blots/embed');

    class MentionBlot extends Embed {

        static create = (value) => {

            const node = super.create();
            node.setAttribute('data-id', value.id);
            node.setAttribute('contenteditable', false);
            node.classList.add('mention');
            node.innerText = `@${ value.username }`;

            return node;
        }

        static formats = (node) => {

            return {
                id: node.getAttribute('data-id'),
                username: node.innerText
            };
        }
    }

    MentionBlot.blotName = 'mention';
    MentionBlot.tagName = 'span';

    if (!Quill.imports['formats/mention']) Quill.register(MentionBlot);
    
    return createQuill(id);
}