let bookmarks = [];

export const toggleBookmark = async (bookmarkDto) => {

    const existsEntity = await existsBookmark(bookmarkDto);

    if (existsEntity) return await deleteBookmark(bookmarkDto);

    return await saveBookmark(bookmarkDto);
}

const saveBookmark = async (bookmarkDto) => {

    bookmarkDto.id = crypto.randomUUID();
    const before = bookmarks.length;
    bookmarks.push(bookmarkDto);

    if (bookmarks.length > before) return true;

    return false;
}

const deleteBookmark = async (bookmarkDto) => {

    const before = bookmarks.length;
    bookmarks = bookmarks.filter(bookmark => !(
        bookmark.userId === bookmarkDto.userId &&
        bookmark.articleId === bookmarkDto.articleId
    ));

    if (bookmarks.length < before) return false;

    return true;
}

export const existsBookmark = async (bookmarkDto) => {

    return bookmarks.some(bookmark => 
        bookmark.userId === bookmarkDto.userId &&
        bookmark.articleId === bookmarkDto.articleId
    );
}