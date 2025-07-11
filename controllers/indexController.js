import { getCategory } from '../helpers/category.js';
import { formatDateString, formatDate } from '../helpers/formattedDate.js';
import { encryptId } from '../helpers/encryption.js';

export default (req, res) => {

    const notices = [{ idNotice: 1, category: 'tech', description: 'algo', publication_date: new Date(), title: 'Ejemplo', image_urls: 'example.jpg', status: 1, type: 1 }];
    const mainNotices = notices.filter(n => n.type == 1);
    const outstandingNotices = mainNotices.filter(n => n.status == 1).slice(0, 4);
    const outstandingFooterNotices = outstandingNotices.slice(0, 3);
    const currentDate = new Date();
    const encryptionKey = process.env.ENCRYPTION_KEY;

    res.render('index', {

        mainNotices,
        outstandingNotices,
        outstandingFooterNotices,
        todayFormatted: formatDate(currentDate),
        getCategory,
        formatDateString,
        encryptId,
        encryptionKey
    });
}