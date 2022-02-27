const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const httpStatus = require('http-status');

// helper modules
const { connectToServer } = require('./Utils/dbConn')
const { errorHandler, errorConverter } = require('./middlewares/error')
const ApiError = require('./Utils/apiError')

// routes 
const getirRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// initiate db connections
connectToServer()

app.use('/apidoc', express.static('apidoc'))

app.use('/v1', getirRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler)

module.exports = app;
