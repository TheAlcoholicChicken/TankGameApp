/**
 * Initialize the Mongo database and the model to store.
 */
const mongoose = require('mongoose');
const uriString = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'TankGame';
const url = uriString + '/' + dbName;
console.log(url);

let User = new mongoose.Schema({
    user_name: String,
    core_app_id: String, // Filled out when user signs in with core app's credentials.
    data: {}
});

mongoose.connect(
    url,
    { useNewUrlParser: true }
);

/**
 * Export functions for the outside use.
 */
module.exports = {
    User: mongoose.model('user', User),
    connect: callback => {
        mongoose.connection
            .once('open', () => {
                console.log('Connected successfully to MongoDB server!');
                callback();
            })
            .on('error', error => {
                console.log('Connection error:', error);
            });
    }
};
