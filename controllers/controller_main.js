class ControllerMain {

  /**
  * Constructor of the class.
  */
  constructor(modelMain, viewMain) {
    this.modelMain = modelMain;
    this.viewMain = viewMain;

    this.init();
  }

  /**
   * Initialize the controller and render the view.
   */
  init() {
    this.renderView();
  }

  /**
   * Handle rendering from the controller logic.
   */
  renderView() {
    this.viewMain.render();
  }

}


