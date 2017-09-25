'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    res.redirect('/login');
});

router.get('/login', passport.authenticate('twitter'));

router.get('/login/return', passport.authenticate('twitter'), (req, res) => {
    const jwtToken = jwt.sign({ userID: req.user.id }, process.env.SESSION_SECRET, { expiresIn: 7200 });
    req.session.jwt = jwtToken;
    res.redirect(`/`);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(err => {
      console.log(err);
    });
    res.redirect('/');
});

module.exports = router;
