/*
* <BCIT COMP4711 Assignment1 - Multiplayer Tank Game>
* Copyright (C) Jake Jonghun Choi A00982751 - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Written by Jake Jonghun Choi <jchoi179@my.bcit.ca>
*/

$(() => {
  var modelGame = new ModelGame();
  var modelMessages = new ModelMessages();
  var viewGame = new ViewGame(modelGame, modelMessages);
  var controllerGame = new ControllerGame(modelGame, viewGame);
});
