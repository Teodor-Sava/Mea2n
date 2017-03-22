const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function (passport) {
    "use strict";
    let opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, function (jwt_payload, done) {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._doc, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
};
