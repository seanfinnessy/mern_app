const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// order of require statements MATTER! Passport.js uses User.js, so we must load User.js first.
require('./models/User');
require('./services/passport');

// connect to our mongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

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