const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('../config/keys');

// order of require statements MATTER! Passport.js uses User.js, so we must load User.js first.
require('../models/User');
require('./services/passport');

// connect to our mongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

// cookieSession is just processing incoming request, populating the req.session property, then passport accesses the data in req.session.
// expressSession stores data in a outside "session store", uses a session Id to access this.
// cookieSession stores data within the cookie. Has about 4 kB of memory, so were okay using this since were just using an Id.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// authRoutes returns a function... with the second set of () it immediately calls the function we called in. app is passed into that arrow function.
require('./routes/authRoutes')(app);

// look at underlying env and see if they declared a port for us (heroku, prod) to use, otherwise use value 5000 (development)
const PORT = process.env.PORT || 5000;
app.listen(PORT); 