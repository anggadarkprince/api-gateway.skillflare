require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const refreshTokenRouter = require('./routes/refreshTokens');
const coursesRouter = require('./routes/courses');
const teachersRouter = require('./routes/teachers');
const mediaRouter = require('./routes/media');
const ordersRouter = require('./routes/orders');
const myCoursesRouter = require('./routes/myCourses');
const webhookRouter = require('./routes/webhook');
const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh-tokens', refreshTokenRouter);
app.use('/teachers', verifyToken, can('admin'), teachersRouter);
app.use('/courses', verifyToken, coursesRouter);
app.use('/orders', verifyToken, ordersRouter);
app.use('/media', verifyToken, can('admin', 'student'), mediaRouter);
app.use('/orders', can('admin', 'student'), ordersRouter);
app.use('/my-courses', verifyToken, can('admin', 'student'), myCoursesRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
