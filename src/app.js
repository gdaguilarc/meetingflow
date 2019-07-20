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
import hbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import cors from 'cors';
import Handlebars from 'handlebars';
import mongoose from 'mongoose';
const MongoStore = require('connect-mongo')(session);

// import favicon from 'serve-favicon';  // Uncomment when favicon exist in public

import indexRoutes from './routes/index';

/**
 * Express main services init
 */
const app = express();
app.use(cors());

require('dotenv').config();

require('./database/connection');
require('./auth/local-auth');

/**
 * All the configuration of the visual elements such as:
 * - Templating main directory (views)
 * - The directory for static content
 * - The engine that is used for templating (ejs)
 * - Favicon of the application
 */
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  // eslint-disable-next-line no-invalid-this
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  })
);

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // this currently dosen't exist!!!

/**
 * Morgan development mode
 *
 * Shows all the request and statuses in the terminal
 */
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.enable('trust proxy', 1);

/**
 * Configuration of the express session
 */
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 19 * 60000
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

/**
 * Configuration of passport session
 */
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signUpMessage = req.flash('signupMessage');
  app.locals.signInMessage = req.flash('signinMessage');
  app.locals.guestRegisterMessage = req.flash('guestRegisterMessage');
  app.locals.onBoardingRegisterMessage = req.flash('onBoardingRegisterMessage');
  app.locals.currentUser = req.user;
  app.locals.roomCreationMessage = req.flash('roomCreationMessage');
  next();
});

/**
 * Import of all the routes in the application
 *
 * - Main routes
 * - Authentication routes
 * - Reservation routes
 */

app.use(indexRoutes);

export default app;
