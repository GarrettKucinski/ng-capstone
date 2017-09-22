'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = process.env.SESSION_SECRET;

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const User = require('../models/user');

const encrypt = text => {
    const cipher = crypto.createCipher( algorithm, password )
    let crypted = cipher.update( text, 'utf8', 'hex' )
    crypted += cipher.final( 'hex' );
    return crypted;
};

passport.use(
    new TwitterStrategy( {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: '/auth/login/return'
        },
        async ( token, tokenSecret, profile, done ) => {

            const userData = {
                twitterID: profile.id,
                name: profile.displayName,
                username: profile.username,
                token: encrypt( token ),
                tokenSecret: encrypt( tokenSecret )
            };

            const user = await User.findOne( { twitterID: profile.id } );

            if ( !user ) {
                const user = await new User({
                    name: profile.displayName,
                    username: profile.username,
                    twitterID: profile.id
                }).save();
            }

            return done( null, userData );
        }
    )
);

passport.serializeUser( ( user, done ) => {
    done( null, user );
} );

passport.deserializeUser( ( obj, done ) => {
    done( null, obj );
} );
