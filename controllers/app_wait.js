$(() => {
  var modelWait = new ModelWait();
  var modelMessages = new ModelMessages();
  var viewWait = new ViewWait(modelWait, modelMessages);
  var controllerWait = new ControllerWait(modelWait, viewWait);
});
