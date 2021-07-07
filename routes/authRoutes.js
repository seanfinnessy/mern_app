const passport = require('passport');

module.exports = (app) => {
  // 1. Attempt to authenticate the user that is visiting this route, and use the strategy called google. Scope specifies what you want from their account.
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // 2. Google sees in the url that we already have the code. Authenticate will see this and exchange it with an actual profile.
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google')
  )
  
  // logout() is a function that is automatically attached to the request object by passport. It takes the cookie and kils the id in it.
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // req is incoming request, res is outgoing response
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};