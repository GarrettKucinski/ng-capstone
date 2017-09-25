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
mongoose.connect("mongodb://localhost:27017/ng-capstone");
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
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
