import { getCategory } from '../helpers/category.js';
import { formatLongDate, formatShortDate } from '../helpers/formattedDate.js';
import { encryptId } from '../helpers/encryption.js';

export default (req, res) => {

    const notices = [{ idNotice: 1, category: 1, description: 'algo', publication_date: new Date(), title: 'Ejemplo', image_urls: 'example.jpg', status: 1 }];
    const currentDate = new Date();
    const encryptionKey = process.env.ENCRYPTION_KEY;

    res.render('index', {

        notices,
        todayFormatted: formatLongDate(currentDate),
        getCategory,
        formatShortDate,
        encryptId,
        encryptionKey
    });
}