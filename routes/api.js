'use strict';

const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const decrypt = text => {
    let decipher = crypto.createDecipher(algorithm, process.env.SESSION_SECRET);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

router.get('/', (req, res, next) => {
    res.json({
        token: req.session.jwt
    });
});

router.get('/tweets', (req, res, next) => {
    const accessToken = decrypt(req.user.token);
    const accessTokenSecret = decrypt(req.user.tokenSecret);
    const twit = require('../config/twitConfig')(accessToken, accessTokenSecret);

    twit.get('search/tweets', { q: '"Girl &amp; the Goat"', result_type: "recent" })
        .then(function (result) {
            res.json({
                result: result
            });
        });

    // twit.get('users/lookup', { screen_name: "AJLongstreet" })
    //     .then(function(result) {
    //         res.json({
    //             result: result
    //         });
    //     });
});

module.exports = router;
