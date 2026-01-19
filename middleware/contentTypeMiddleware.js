import { errorCodeMessages } from "../messages/codeMessages.js";

const checkContentType = (req, res, next, contentTypeRequired) => {

    if (req.method === 'GET' || !req.body || !Object.keys(req.body).length) return next();

    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes(contentTypeRequired)) {

        return res.status(415).json({
            code: errorCodeMessages.CONTENT_TYPE_INVALID,
            contentType: contentTypeRequired
        });
    }

    next();
}

export const checkTypeContentFile = (req, res, next) => checkContentType(req, res, next, 'multipart/form-data');

export const checkTypeContentJson = (req, res, next) => checkContentType(req, res, next, 'application/json');

export const checkContentTypePlainText = (req, res, next) => checkContentType(req, res, next, 'text/plain');