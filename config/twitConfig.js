const Twit = require('twit');

module.exports = function(accessToken, accessTokenSecret) {
    const twit = new Twit({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: accessToken,
        access_token_secret: accessTokenSecret
    });
    return twit;
};