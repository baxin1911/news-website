export const checkContentType = (req, res, next) => {

    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {

        return res.status(415).json({
            error: 'El Content-Type requiere application/json.'
        });
    }

    next();
}