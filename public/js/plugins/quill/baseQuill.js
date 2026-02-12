export const createQuill = (id) => {
    const quill = new Quill(id, {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote']
            ]
        }
    });

    const { keyboard } = quill;

    keyboard.bindings[13].unshift({
        key: 13,
        handler(range, context) {

            const tributeMenu = document.querySelector('.mention-tribute');

            if (tributeMenu && tributeMenu.offsetParent !== null) {
                return false; // bloquear salto
            }

            return true;
        }
    });

    return quill;
}