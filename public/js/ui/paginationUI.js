const buildPageURL = (page) => {

    const params = new URLSearchParams({ ...queryParams, currentPage: page });
    
    return `/${currentRoute}?${params.toString()}`;
}

export const buildPaginationHTML = (pagination) => {

    let html = `<ul class="pagination pagination-circle pagination-lg justify-content-center">`;

    if (pagination.hasPrevPage) html += `<li class="pagination-item"><a href="${buildPageURL(pagination.currentPage - 1)}" class="page-link">Anterior</a></li>`;

    pagination.visiblePages.forEach(page => {

        if (page === pagination.currentPage) html += `<li class="pagination-item active" aria-current="page"><span class="page-link">${page}<span class="visually-hidden">(actual)</span></span></li>`;
        else html += `<li class="pagination-item"><a href="${buildPageURL(page)}" class="page-link">${page}</a></li>`;
    });

    if (pagination.hasNextPage) html += `<li class="pagination-item"><a href="${buildPageURL(pagination.currentPage + 1)}" class="page-link">Siguiente</a></li>`;

    html += `</ul>`;

    return html;
}