export const createQuill = (id) => {
    return new Quill(id, {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote']
            ]
        }
    });
}