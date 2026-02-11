export const createTribute = (element, selectTemplate, searchFn) => {

    const tribute = new Tribute({
        trigger: '@',
        lookup: item => item.username.toLowerCase(),
        values: async (text, cb) => {

            if (!text) return cb([]);

            const data = await searchFn(text);
            cb(data);
        },
        selectTemplate: item => selectTemplate(item, tribute),
        menuItemTemplate: item => '@' + item.original.username,
        noMatchTemplate: () => '<div class="tribute-no-match">Usuario no encontrado</div>'
    });
    tribute.attach(element);
}