const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// "user" is what we pulled out of the database 2 seconds ago. user.id is using the id assigned to the mongoDB record that is automatically generated.
// creates cookie with user id from mongo.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// we get whatever had been in the cookie, so we just need id. once we turn the id back into user by searching all our users for the specified id, we call "done".
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// callback url is for where the user is redirected to AFTER being authenticated.
// callback function is our oppurtunity to use the info (profile, access token, etc) we got back from Google, and do something with it.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, // if request runs thru proxy (heroku proxy), change from http to https
    },
    (accessToken, refreshToken, profile, done) => {
      // find the first record inside User collection with a googleId of profile.id.
      // the query returns a Promise (tool we use with JS to handle asynchronous code).
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profileId.
          // call "done", 1st arg is error, 2nd arg is the user record.
          done(null, existingUser);
        } else {
          // we dont have a user record with this id, make a new record.
          // new model instance of a user, then save.
          // then the database returns a Promise with a model instance of the user, call "done" with that more "fresh" user.
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
