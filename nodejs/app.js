// Setting up express
import express from 'express';
// import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csurf from 'csurf';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import passport from 'passport';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;

const app = express();
app.set('view engine', 'ejs'); // setting up view engine

// Importing configuration
import config from './config/config.js';

// Connecting to MongoDB database
mongoose.connect(config.mongo.string).catch(err => {
  console.log(err);
});
mongoose.connection.on('error', err => {
  console.log(err);
});



///////////*  MIDDLEWARES  *///////////

app.use(express.static('./public')); // for redirecting all static files request to 'public' directory
app.use(urlencoded({ limit: '50mb', extended: true })); // to extract data from HTTP urlencoded request
app.use(json({ limit: '50mb', extended: true })); // to extract data passed as JSON from AJAX request

app.use(cookieParser()); // for handling cookies

app.use(
  session({
    secret: 'dsf5ds5f5dsfd', // for handling session
    resave: true,
    saveUninitialized: true
  })
);

app.use(csurf({ cookie: true })); // for handling CSRF token

// Custom CSRF message
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  res.status(403).send('unauthorized access');
});

app.use(flash()); // for passing messages to views

// Passport strategy
//invoking the Passport configuration function
import passportConfig from './config/passport.js';
passportConfig();

app.use(passport.initialize());
app.use(passport.session());

// Global variables for views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error');
  res.locals.message = req.flash('message');
  res.locals.user = req.user;
  res.locals.redirect = req.query.redirect;
  next();
});

// Initializing routes
import userRoutes from './routes/user.js';
app.use(userRoutes);

const server = app.listen(config.server.port, () => {
  console.log(`server is running at port: ${config.server.port}`);
});

// Initiating socket connection
import socket from './services/socket.js';
socket(server);


