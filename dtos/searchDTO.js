export const createSearchDtoForSearchSettings = (query, offset) => ({
    q: query.q || '',
    offset,
    limit: 10
});

export const createSearchDtoForUsernameSearch = (query, offset = 0) => ({
    q: query.q || '',
    limit: 3,
    offset
});