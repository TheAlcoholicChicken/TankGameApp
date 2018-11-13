
var config = require('./config.js');

module.exports = (app, db) => {

  function authToken(req, res, next) {
    let token = req.body.token;

    if (!token) res.status(401).send({ error: "Token Missing" });

    if (token === config.token) {
        next();
    } else {
        res.status(401).send({ error: 'Invalid Token' });
    }
  }

  /* Handle POST requests from the core-app. Returns user information.
   */
  app.post('/user/get_badge_message', authToken, (req, res) => {
    res.status(200);
    res.json({
      userid: '123456',
      msg: 'Top 13th Player or Javascript 2% Top Player'
    });
    res.end();
  });

  app.post('/user/increment_win', authToken, (req, res) => {
    // update DB
  });
};
   