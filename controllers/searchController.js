import { encryptId } from '../helpers/encryption.js';
import { formatLongDate, formatShortDate } from '../helpers/formattedDate.js';
import { getCategory } from '../helpers/category.js';

export const search = (req, res) => {
    const { q } = req.query || null;
    const { date } = req.query || null;

    // Get news from DB
    
    const notices = [{ idNotice: 1, category: 1, description: 'Esta descripcin es un ejemplo de texto largo', publicationDate: new Date(), title: 'Este título es un ejemplo de texto largo', imageUrls: 'example.jpg', status: 1 }];
    const currentDate = new Date();
    const encryptionKey = process.env.ENCRYPTION_KEY;
    
    res.render('search', { 
        success: res.locals.success,
        error: res.locals.error,
        notices,
        todayFormatted: formatLongDate(currentDate),
        getCategory,
        formatShortDate,
        encryptId,
        encryptionKey
    });
}