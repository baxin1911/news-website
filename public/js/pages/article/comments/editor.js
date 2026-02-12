import { initFormCommentQuill } from "../../../plugins/quill/articleQuill.js";

export const initEditor = () => {

    const maxLength = 500;
    const quill = initFormCommentQuill('#editor');
    quill.on('text-change', () => {

        const text = quill.getText().trim();

        if (text.length > maxLength) quill.deleteText(maxLength, quill.getLength());

        const len = quill.getText().trim().length;
        document.getElementById('counter').innerText = `${ len } / ${ maxLength }`;
    });

    return quill;
}