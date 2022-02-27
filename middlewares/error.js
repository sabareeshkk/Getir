const { MongoServerError } = require('mongodb');
const httpStatus = require('http-status');
const ApiError = require('../Utils/apiError');

/**
 * to convert any error to custome errors
 * @module errorConverter
 * @function
 * @param {Object} err - Error objec
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof MongoServerError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

/**
 * send response of error object
 * @module errorConverter
 * @function
 * @param {Object} err - Error objec
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (!err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        msg: message,
    };

    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};