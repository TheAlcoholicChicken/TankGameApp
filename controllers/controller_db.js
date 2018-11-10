/**
 * Initialize the Mongo database and the model to store.
 */
const mongoose = require('mongoose');
const uriString = 'mongodb://localhost:27017';

let TankGameDbSchema = new mongoose.Schema({
      app_id: String,
      user: [{
        user_id: String, // Computed when user signs up.
        core_app_id: String, // Filled out when user signs in with core app's credentials.
        data: {

        }
      }]
    });
let TankGameDb = mongoose.model('TankGameDb', TankGameDbSchema);

mongoose.connect(uriString);
const db = mongoose.connection;









/**
 * Export functions for the outside use.
 */
module.exports = { };