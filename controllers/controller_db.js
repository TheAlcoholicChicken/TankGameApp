/**
 * Initialize the Mongo database and the model to store.
 */
const mongoose = require('mongoose');
const uriString = 'mongodb://localhost:27017';
const dbName = 'TankGame';

let User = new mongoose.Schema({
    user_name: String,
    core_app_id: String, // Filled out when user signs in with core app's credentials.
    data: {}
});

mongoose.connect(
    uriString + '/' + dbName,
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
