$(() => {
  var modelMain = new ModelMain();
  var modelMessages = new ModelMessages();
  var viewMain = new ViewMain(modelMain, modelMessages);
  var controllerMain = new ControllerMain(modelMain, viewMain);
});
