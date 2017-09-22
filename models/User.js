'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    twitterID: String,
    name: String,
    username: String,
    accessToken: String,
    accessTokenSecret: String
});

const user = mongoose.model('User', UserSchema);

module.exports = user;