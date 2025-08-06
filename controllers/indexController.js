import { getCategory } from '../helpers/category.js';
import { formatLongDate, formatShortDate } from '../helpers/formattedDate.js';
import { encryptId } from '../helpers/encryption.js';

export default (req, res) => {

    const notices = [{ idNotice: 1, category: 1, description: 'algo', publicationDate: new Date(), title: 'Ejemplo', imageUrls: 'example.jpg', status: 1 }];
    const currentDate = new Date();
    const encryptionKey = process.env.ENCRYPTION_KEY;
    

    res.render('index', {

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