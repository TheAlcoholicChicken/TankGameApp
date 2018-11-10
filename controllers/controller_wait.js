/*
* <BCIT COMP4711 Assignment1 - Multiplayer Tank Game>
* Copyright (C) Jake Jonghun Choi A00982751 - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Written by Jake Jonghun Choi <jchoi179@my.bcit.ca>
*/

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


