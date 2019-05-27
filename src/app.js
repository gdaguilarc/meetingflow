/**
 * @file
 * The app main file, is in charge of all the middleware.
 *
 * This is the core of our application, joins all the middleware, controllers and functions.
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import favicon from 'serve-favicon';  // Uncomment when favicon exist in public

const app = express();

require('dotenv').config();

/**
 * All the configuration of the visual elements such as:
 * - Templating main directory (views)
 * - The directory for static content
 * - The engine that is used for templating (ejs)
 * - Favicon of the application
 */
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // this currently dosen't exist!!!

/**
 * Morgan development mode
 *
 * Shows all the request and statuses in the terminal
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Import of all the routes in the application
 *
 * - Main routes
 * - Authentication routes
 * - Reservation routes
 */
app.use(require('./routes'));

export default app;
