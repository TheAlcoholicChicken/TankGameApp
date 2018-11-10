/**
 * Initialize the Express package and set static directories.
 */
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const ModelTanks = require('./models/model_tanks');
const GameLogic = require('./controllers/controller_gamelogic')

/**
 * Prepare the Mongo Database.
 */
var dbConnector = require('./controllers/controller_db');

/**
 * For Heroku deployment.
 */
var port = process.env.PORT || 8080;

/**
 * Include all required folders statically.
 */
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/models'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/images'));
app.use(express.static(__dirname + '/controllers'));

/**
 * Determine how to parse the body of requests.
 */
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.text());

/**
 * Represents the game states which is one of followings:
 * 'waiting_for_two', 'waiting_for_one', 'playing': 0, 1, 2 
 */
var gameState = 0;

/**
 * Game FPS (Frame Per Second).
 */
const GAME_FPS = 20;  

/**
 * Temporary name storage for page transitions. 
 */
var tempPlayerName = '';

/**
 * Player information storage.
 */
var playerIdsArray = [];
var playerNamesArray = [];

/**
 * The main data objects that contains all tanks. 
 */
var modelTanks;

/**
 * The timer for real time processing.
 */
var realTimeProcessing;

/**
 * Socket.io callbacks.
 */
io.on('connection', (socket) => {

  if (gameState !== 2) {

    // Add the user to the player's list.
    playerIdsArray.push(socket.id);
    playerNamesArray.push(tempPlayerName);
    console.log('A user connected with id: ' + socket.id + ', with name: ' + tempPlayerName);

    // Move the tanks to the left.
    socket.on('moveLeft', (arg) => {
      GameLogic.moveLeft(socket, modelTanks);
      io.emit('update', JSON.stringify(modelTanks.data));
    });

    // Move the tanks to the Right.
    socket.on('moveRight', (arg) => {
      GameLogic.moveRight(socket, modelTanks);
      io.emit('update', JSON.stringify(modelTanks.data));
    });

    // Rotate the turret to the left.
    socket.on('rotateTurretLeft', (arg) => {
      GameLogic.rotateTurretLeft(socket, modelTanks);
      io.emit('update', JSON.stringify(modelTanks.data));
    });

    // Rotate the turret to the right.
    socket.on('rotateTurretRight', (arg) => {
      GameLogic.rotateTurretRight(socket, modelTanks);
      io.emit('update', JSON.stringify(modelTanks.data));
    });

    // Shoot the missiles. 
    socket.on('fire', (amount) => {
      GameLogic.fire(socket, modelTanks);
      io.emit('update', JSON.stringify(modelTanks.data));
    });

    // Eliminate the user from the player's list.
    socket.on('disconnect', () => {
      console.log('user disconnected with id: ' + socket.id);
      var index = playerIdsArray.indexOf(socket.id);
      if (index !== -1) {
        playerIdsArray.splice(index, 1);
        playerNamesArray.splice(index, 1);
      }
      gameState--;
    });

    // Update the gameState and start the game when ready.
    if (gameState === 0) {
      gameState = 1;
    } else if (gameState === 1) {
      gameState = 2;
      modelTanks = new ModelTanks(playerIdsArray[0], playerNamesArray[0],                                          
                                  playerIdsArray[1], playerNamesArray[1]);

      // Start the game.
      io.emit('game_begin', JSON.stringify(modelTanks.data));

      // Infinite loop for real time processing.
      realTimeProcessing = setInterval(() => {

        // Reduce cool down values.
        GameLogic.coolDown(socket, modelTanks);

        // Calculate physics of the missiles.
        GameLogic.processMissiles(socket, modelTanks);
        
        // Update the game.
        io.emit('update', JSON.stringify(modelTanks.data));

        // End game if the conditions are met.
        if (modelTanks.data.player1.lives === 0) {
          io.emit('game_end', JSON.stringify({
            "player1win": false,
            "player1Name": modelTanks.data.player1.name,
            "player2Name": modelTanks.data.player2.name
          }));
          clearInterval(realTimeProcessing);
          playerIdsArray = [];
          playerNamesArray = [];
          io.emit('force_disconnect', 0);
        } else if (modelTanks.data.player2.lives === 0) {
          io.emit('game_end', JSON.stringify({
            "player1win": true,
            "player1Name": modelTanks.data.player1.name,
            "player2Name": modelTanks.data.player2.name
          }));
          clearInterval(realTimeProcessing);
          playerIdsArray = [];
          playerNamesArray = [];
          io.emit('force_disconnect', 0);
        }
 
        // If the other player disconnects. 
        if (gameState === 1) {
          io.emit('other_disconnect', 0);
          clearInterval(realTimeProcessing);
        }

      }, 1000 / GAME_FPS);
    }
  }
});

/**
 * Routing for /. 
 */
app.get('/', (req, res) => {
  console.log("Client Request: GET /");
  if (gameState === 2) {
    res.sendFile(__dirname + '/views/wait.html');
  } else {
    res.sendFile(__dirname + '/main.html');
  }
});

/**
 * Routing for /start_game. 
 */
app.get('/start_game', (req, res) => {
  console.log("Client Request: GET /start_game");
  tempPlayerName = req.query.user_name;
  res.sendFile(__dirname + '/views/game.html');
});

/**
 * Start the server and listen to the client. 
 */
http.listen(port, () => {
  console.log('Listening on *:' + port);
});



