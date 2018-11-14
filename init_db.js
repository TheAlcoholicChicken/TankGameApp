/* THIS MUST BE RUN DURING INITIALIZATION OF ENV ONLY ONCE */
var db = require('./controllers/controller_db');
db.connect(() => {
    db.mainDb().create({ token: 'tankGameToken', users: [] }, () => {
        console.log('done');
        process.exit();
    });
});
