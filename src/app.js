'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const router = require('./routes/index');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Security & logging
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine — EJS (views/ at project root)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// API routes
app.use('/api/v1', router);

// 404 catch-all (after all routes)
app.use(notFoundHandler);

// Global error handler (must be last, 4 args)
app.use(errorHandler);

module.exports = app;
