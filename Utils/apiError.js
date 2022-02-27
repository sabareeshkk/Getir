class ApiError extends Error {
    /**
     *  generates the custome error message
     * @param {Number} statusCode 
     * @param {String} message 
     * @param {Boolean} isOperational 
     * @param {String} stack 
     */
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;