'use strict';

const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const superagent = require('superagent');

const decrypt = text => {
    let decipher = crypto.createDecipher(algorithm, process.env.SECRET);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

router.get('/', (req, res, next) => {
  if(req.user) {
    res.json({
        user: {
          name: req.user.name,
          username: req.user.username,
          location: req.user.location,
          photoUrl: req.user.photoUrl,
          profile: req.user.profile
        },
        token: req.session.jwt
    });
  } else {
    res.json({
      user: null
    });
  }
});

router.get('/tweets', (req, res, next) => {
    const accessToken = decrypt(req.user.token);
    const accessTokenSecret = decrypt(req.user.tokenSecret);
    const twit = require('../config/twitConfig')(accessToken, accessTokenSecret);

    twit.get('account/verify_credentials')
      .then(user => {
        superagent.get('https://api.yelp.com/v3/businesses/search')
          .set('Authorization', `Bearer ${ process.env.YELP_ACCESS_TOKEN }`)
          .query({ term: 'restaurant'})
          .query({ location: user.data.location })
          .end((err, data) => {
            if(err) { console.log(err); }
            res.send(data.text);
          });
      });
});

module.exports = router;
