
/**
 * used to wrap the async fucntion for catching the errors gracefully
 * @param  {Function} fn
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;