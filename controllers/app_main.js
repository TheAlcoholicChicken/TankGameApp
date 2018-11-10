/*
* <BCIT COMP4711 Assignment1 - Multiplayer Tank Game>
* Copyright (C) Jake Jonghun Choi A00982751 - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Written by Jake Jonghun Choi <jchoi179@my.bcit.ca>
*/

$(() => {
  var modelMain = new ModelMain();
  var modelMessages = new ModelMessages();
  var viewMain = new ViewMain(modelMain, modelMessages);
  var controllerMain = new ControllerMain(modelMain, viewMain);
});
