import { validateDateRange, validateEndDate, validateSelectedOrdering, validateStartDate } from "../public/js/utils/validations/search.js";

export const searchNews = async (params) => {
    const { startDate, endDate, ordering } = params;

    const errors = {
        startDateError: validateStartDate(startDate),
        endDateError: validateEndDate(endDate),
        orderingError: validateSelectedOrdering(ordering),
        dateRangeError: validateDateRange(startDate, endDate)
    };

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return { errors };

    // Get news from DB
    
    const notices = [
        { idNotice: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: 'example.jpg', status: 1 },
        { idNotice: 2, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: 'example.jpg', status: 1 },
        { idNotice: 3, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: 'example.jpg', status: 1 },
        { idNotice: 4, category: 2, description: 'Esta descripcin es un ejemplo de texto largo 2', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo 2', imageUrls: 'example.jpg', status: 1 }
    ];

    return { notices };
}
