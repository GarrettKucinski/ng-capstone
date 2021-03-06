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

const yelpRoot = 'https://api.yelp.com/v3/businesses';

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

router.get('/reviews', (req, res, next) => {
    const accessToken = decrypt(req.user.token);
    const accessTokenSecret = decrypt(req.user.tokenSecret);
    const twit = require('../config/twitConfig')(accessToken, accessTokenSecret);

    superagent.get(`${ yelpRoot }/search`)
      .set('Authorization', `Bearer ${ process.env.YELP_ACCESS_TOKEN }`)
      .query({ term: 'food' })
      .query({ sort_by: 'rating' })
      .query({ limit: 50})
      .query({ location: req.user.location })
      .end((err, data) => {
        if(err) { console.log(err); }
        res.send(data.text);
      });
});

router.get('/:businessName', (req, res, next) => {
  superagent.get(`${ yelpRoot }/${ req.params.businessName }`)
    .set('Authorization', `Bearer ${ process.env.YELP_ACCESS_TOKEN }`)
    .end((err, data) => {
      if(err) { console.log(err); }
      res.send(data.text);
    });
});

router.get('/:businessName/reviews', (req, res, next) => {
  superagent.get(`${ yelpRoot }/${ req.params.businessName }/reviews`)
    .set('Authorization', `Bearer ${ process.env.YELP_ACCESS_TOKEN }`)
    .end((err, data) => {
      if(err) { console.log(err); }
      res.send(data.text);
    });
});

module.exports = router;
