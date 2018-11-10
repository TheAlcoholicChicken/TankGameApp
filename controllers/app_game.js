$(() => {
  var modelGame = new ModelGame();
  var modelMessages = new ModelMessages();
  var viewGame = new ViewGame(modelGame, modelMessages);
  var controllerGame = new ControllerGame(modelGame, viewGame);
});
