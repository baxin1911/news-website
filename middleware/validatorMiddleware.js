import { validationResult } from 'express-validator';
import { errorCodeMessages } from '../messages/codeMessages.js';
import { buildPagination } from '../utils/paginationUtils.js';

export const validate = (req, res, next) => {

    const errorsArray = validationResult(req).array();

    if (errorsArray.length > 0) {

        const errors = {};
        
        errorsArray.forEach(error => {
            errors[error.path] = error.msg;
        });

        return res.status(400).json({ errors, code: errorCodeMessages.VALIDATION_ERROR });
    }

    next();
}

export const validateLogin = (req, res, next) => {

    const errorsArray = validationResult(req).array();

    if (errorsArray.length > 0) return res.status(401).json({ code: errorCodeMessages.LOGIN_ERROR });

    next();
}

export const validatePagination = (getTotalItems, itemsPerPage) => async (req, res, next) => {

    try {
        let { currentPage = 1 } = req.query;
        currentPage = parseInt(currentPage);

        if (isNaN(currentPage) || currentPage < 1) return res.status(404).render('pages/error/404');

        const totalItems = await getTotalItems(req);
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (currentPage > totalPages && totalPages > 0) {
            
            const { path } = req;
            const params = new URLSearchParams(req.query);
            params.set('currentPage', totalPages);

            return res.redirect(301, `${ path }?${ params }`);
        }

        const offset = (currentPage - 1) * itemsPerPage;
        const pagination = buildPagination(totalItems, currentPage, itemsPerPage);
        req.pageSettings = { offset, pagination, itemsPerPage };
        next();

    } catch (err) {

        console.log(err)
        return res.status(500).render('pages/error/500');
    }
}