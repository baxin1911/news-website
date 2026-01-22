export const buildPagination = (totalItems, currentPage = 1, itemsPerPage, maxVisiblePages = 5) => {

    if (totalItems < 1) return null;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const leftVisiblePages = Math.floor(maxVisiblePages / 2);
    const rightVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = currentPage - leftVisiblePages;
    let endPage = currentPage + rightVisiblePages;

    if (startPage < 1) {

        startPage = 1;
        endPage = (totalPages < maxVisiblePages) ? totalPages : maxVisiblePages;
    }

    if (endPage > totalPages) {

        endPage = totalPages;
        startPage = (totalPages < maxVisiblePages) ? 1 : totalPages - maxVisiblePages + 1;
    }

    return {
        currentPage,
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage < totalPages,
        visiblePages: Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }
}