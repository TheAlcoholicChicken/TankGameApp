class ControllerWait {

  /**
  * Constructor of the class.
  */
  constructor(modelWait, viewWait) {
    this.modelWait = modelWait;
    this.viewWait = viewWait;

    this.viewWait.onClickButtonRefresh = this.onClickButtonRefresh.bind(this);

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
    this.viewWait.render();
  }

  /**
   * Event handler for the refresh button.
   */
  onClickButtonRefresh() {
    window.location.href = "./";
  }

}


