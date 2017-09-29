'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// mongodb connection
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Set up passport and strategies
require('./config/passport.config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: db
    })
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Catch all other routes and return the index file
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client2/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

module.exports = app;
