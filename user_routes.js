const config = require('./config.js');
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

module.exports = (app, db) => {
    function authToken(req, res, next) {
        let token = req.body.token;

        if (!token) res.status(401).send({ error: 'Token Missing' });

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
        let user_id = req.body.user_id;

        db.User.findOne({ core_app_id: user_id }, (err, user) => {
            res.json({
                userid: user_id,
                badge_text:
                    'User has won ' + user.data.score + ' games'
            });
            res.end();
        });
    });

    app.post('/user/increment_win', authToken, (req, res) => {
        // update DB
        db.User.findOne({ user_name: req.body.user_name }, (err, user) => {
            console.log("found");
            console.log(user);
            
            if (user) {
                user.set({
                    data: {
                        ...user.data,
                        wins: user.data.wins + 1
                    }
                });
                user.save(err => {
                    console.log('updating done');
                    if (!err) {
                        res.status(200).end();
                    }
                });
            } else {
                db.User.create(
                    {
                        user_name: req.body.user_name,
                        core_app_id: tokgen.generate(),
                        data: {
                            wins: 1
                        }
                    },
                    err => {
                        console.log("creation done");
                        
                        if (!err) {
                            res.status(200).end();
                        }
                    }
                );
            }
        });
    });
};
