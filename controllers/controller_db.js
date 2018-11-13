/**
 * Initialize the Mongo database and the model to store.
 */
const mongoose = require('mongoose');
const uriString = 'mongodb://localhost:27017';
const dbName = 'TankGame';

let User = new mongoose.Schema({
    user_id: String, // Computed when user signs up
    user_name: String,
    core_app_id: String, // Filled out when user signs in with core app's credentials.
    data: {}
});

let TankGameDbSchema = new mongoose.Schema({
    token: String,
    user: [User]
});

mongoose.connect(
    uriString + '/' + dbName,
    { useNewUrlParser: true }
);

/**
 * Export functions for the outside use.
 */
module.exports = {
    mainDb: () => mongoose.model('main', TankGameDbSchema),
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
