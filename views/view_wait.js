class ViewWait {

  /**
   * Constructor of the class.
   */
  constructor(modelWait, modelMessages) {
    this.modelWait = modelWait;
    this.modelMessages = modelMessages;
    this.html = '';
    this.elementViewScreen = document.getElementById('view_screen');
    this.onClickButtonRefresh = null;
  }

  /**
   * Build all components and render the page.
   */
  render() {
    this.html = '';
    this.createElements().show().setupListeners();
  }

  /**
   * Create all elements on the screen.
   */
  createElements() {

    this.html += '<div class="center">';
    this.html += '<br/><h1 class="display-3">' + this.modelMessages.data.waitTheGameIsPlaying + '</h1><br/>';

    // Refresh button.
    this.html += '<button id="btn_refresh" type="button" class="btn-primary btn-lg">Refresh</button>';

    this.html += '</div>';
    return this;
  }

  /**
   * Present the built html to the screen.
   */
  show() {
    this.elementViewScreen.innerHTML = this.html;
    return this;
  }

  /**
   * Register listeners dynamically to the UIs.
   */
  setupListeners() {
    this.elementViewScreen.querySelector('#btn_refresh').addEventListener('click', this.onClickButtonRefresh);
    return this;
  }

}
