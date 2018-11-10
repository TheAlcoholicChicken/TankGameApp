class ViewMain {

  /**
   * Constructor of the class.
   */
  constructor(modelMain, modelMessages) {
    this.modelMain = modelMain;
    this.modelMessages = modelMessages;
    this.html = '';
    this.elementViewScreen = document.getElementById('view_screen');
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

    this.html += '<div class="center row">';
    this.html += '<div class="col-sm"></div>'
    this.html += '<div class="col-sm">'

    this.html += '<br/><h1 class="display-1">' + this.modelMessages.data.gameTitle + '</h1>';
    this.html += '<br/><h3 class="display-5">' + this.modelMessages.data.askName + '</h3>';
    this.html += '<form action="/start_game" method="get">';
    this.html += '<input id="name" name="user_name" class="form-control" autocomplete="off" required/>';
    this.html += '<input id="btn_submit" class="btn btn-danger btn-lg" type="submit" value="Go Tank!" />'; 
    this.html += '</form>';

    this.html += '</div>'
    this.html += '<div class="col-sm"></div>'
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
    return this;
  }

}
