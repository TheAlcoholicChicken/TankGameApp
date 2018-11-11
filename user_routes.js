var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.text());

/* Handle POST requests from the core-app. Returns user information.
*/
app.post('/user/get_badge_message', (err, res) => {
  res.status(200);
  res.json({ 
    userid: '123456', 
    msg: 'Top 13th Player or Javascript 2% Top Player'  
  });
  res.end();
});

module.exports = app;