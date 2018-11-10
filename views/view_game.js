class ViewGame {

  /**
   * Constructor of the class.
   */
  constructor(modelGame, modelMessages) {
    this.modelGame = modelGame;
    this.modelMessages = modelMessages;
    this.html = '';
    this.elementViewScreen = document.getElementById('view_screen');

    this.imageLife = new Image();
    this.imageLife.src = "./images/life.png"; 
    
    this.onClickButtonRestart = null;

    this.onClickButtonAimLeft = null;
    this.onClickButtonAimRight = null;
    this.onClickButtonMoveLeft = null;
    this.onClickButtonMoveRight = null;
    this.onClickButtonFireMissile = null;
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

    this.html += '<div class="container"><div class="row">';
    this.html += '<div class="col-md-1"></div>';
    this.html += '<div class="col-md-10">';

    this.html += '<div class="center">';
    this.html += '<img class="img-fluid" src="./images/title.jpg" />';
    this.html += '</div>';

    this.html += '<canvas id="canvas_game" width="800" height="600"></canvas>';

    this.html += '<div class="row center">';
    this.html += '<div class="col-6">';
    this.html += '<button id="btn_aim_left" type="button" class="btn-primary btn-lg btn-block">Aim Left&nbsp;&nbsp;(Q)</button>';
    this.html += '</div>';
    this.html += '<div class="col-6">';
    this.html += '<button id="btn_aim_right" type="button" class="btn-primary btn-lg btn-block">Aim Right (E)</button><br/>';
    this.html += '</div>';
    this.html += '</div>';
    
    this.html += '<div class="row center">';
    this.html += '<div class="col-6">';
    this.html += '<button id="btn_move_left" type="button" class="btn-primary btn-lg btn-block">Move Left&nbsp;&nbsp;(A)</button>';
    this.html += '</div>';
    this.html += '<div class="col-6">';
    this.html += '<button id="btn_move_right" type="button" class="btn-primary btn-lg btn-block">Move Right (D)</button><br/>';
    this.html += '</div>';
    this.html += '</div>';

    this.html += '<div class="row center">';
    this.html += '<button id="btn_fire_missile" type="button" class="btn-primary btn-lg btn-block">Fire Missile (W)</button>';
    this.html += '</div>';

    this.html += '<div>';
    this.html += '<table class="table table-bordered">'
    this.html += '<tr>';
    this.html += '<th class="table-danger">' + this.modelMessages.data.instructionObjective + '</th>';
    this.html += '</tr>';
    this.html += '<tr>';
    this.html += '<td class="table-success">';
    this.html += this.modelMessages.data.instructionInterface;
    this.html += '<br/>';
    this.html += this.modelMessages.data.instructionKeyboard;
    this.html += '</td>';
    this.html += '</tr>';
    this.html += '<tr>';
    this.html += '<td class="table-warning">' + this.modelMessages.data.instructionCopyright + '</td>';
    this.html += '</tr>';
    this.html += '</table>';
    this.html += '</div>';
    
    this.html += '<div class="col-md-1"></div>';
    this.html += '</div></div>';
    
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

    this.elementViewScreen.querySelector('#btn_aim_left').addEventListener('click', this.onClickButtonAimLeft);
    this.elementViewScreen.querySelector('#btn_aim_right').addEventListener('click', this.onClickButtonAimRight);
    this.elementViewScreen.querySelector('#btn_move_left').addEventListener('click', this.onClickButtonMoveLeft);
    this.elementViewScreen.querySelector('#btn_move_right').addEventListener('click', this.onClickButtonMoveRight);
    this.elementViewScreen.querySelector('#btn_fire_missile').addEventListener('click', this.onClickButtonFireMissile);

    this.canvas = document.getElementById("canvas_game");
    this.context = this.canvas.getContext("2d");

    return this;
  }

  /**
   * Render game graphics on the canvas.
   */
  renderGame(arg) {
    let data = JSON.parse(arg);

    // Clear the canvas.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = "30px Arial";
    this.context.lineWidth = 5;

    // Holder Lines for each side.
    this.context.beginPath();
    this.context.moveTo(0, data.player1.y);
    this.context.lineTo(this.canvas.width, data.player1.y);
    this.context.closePath();
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0, data.player2.y);
    this.context.lineTo(this.canvas.width, data.player2.y);
    this.context.closePath();
    this.context.stroke(); 
    
    // Players tanks.
    this.context.beginPath();
    this.context.fillStyle = 'red';
    this.context.arc(data.player1.x, data.player1.y, data.player1.r, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    this.context.beginPath();
    this.context.fillStyle = 'blue';
    this.context.arc(data.player2.x, data.player2.y, data.player2.r, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    // Players names.
    this.context.fillStyle = 'black';
    this.context.fillText("Player 1: " + data.player1.name, 10, 30);
    this.context.fillText("Player 2: " + data.player2.name, 10, 585);

    // Players lives.
    for (let i = 0; i < data.player1.lives; i++) {
      this.context.drawImage(this.imageLife, this.canvas.width - 35 * i - 35, 5);
    }
    for (let i = 0; i < data.player2.lives; i++) {
      this.context.drawImage(this.imageLife, this.canvas.width - 35 * i - 35, 565);
    }

    // Players cool down.
    this.context.fillStyle = 'cyan';
    const COOL_DOWN_WIDTH = 35;
    const COOL_DOWN_HEIGHT = 5;
    this.context.fillRect(data.player1.x - COOL_DOWN_WIDTH, data.player1.y - COOL_DOWN_HEIGHT, 2 * COOL_DOWN_WIDTH * data.player1.coolDown / 100, 2 * COOL_DOWN_HEIGHT);

    this.context.fillRect(data.player2.x - COOL_DOWN_WIDTH, data.player2.y - COOL_DOWN_HEIGHT, 2 * COOL_DOWN_WIDTH * data.player2.coolDown / 100, 2 * COOL_DOWN_HEIGHT);

    // Players gun barrels.
    this.context.beginPath();
    this.context.moveTo(data.player1.x, data.player1.y);
    this.context.lineTo(data.player1.turretX, data.player1.turretY);
    this.context.closePath();
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(data.player2.x, data.player2.y);
    this.context.lineTo(data.player2.turretX, data.player2.turretY);
    this.context.closePath();
    this.context.stroke(); 

    // Players missiles.
    for (let i = 0; i < data.player1.missiles.length; i++) {

      this.context.beginPath();
      this.context.fillStyle = 'red';
      this.context.arc(data.player1.missiles[i].x, 
                       data.player1.missiles[i].y, 
                       data.player1.missiles[i].radius, 
                       0, 2 * Math.PI);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    }
    for (let i = 0; i < data.player2.missiles.length; i++) {

      this.context.beginPath();
      this.context.fillStyle = 'blue';
      this.context.arc(data.player2.missiles[i].x, 
                       data.player2.missiles[i].y, 
                       data.player2.missiles[i].radius, 
                       0, 2 * Math.PI);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    }
  }

  /**
   * Temporary wait page for the other player.
   */
  renderWaitOtherPlayer() {
    this.html = '';

    this.html += '<div class="center">';
    this.html += '<br/><h1 class="display-3">' + this.modelMessages.data.waitOtherPlayer + '</h1><br/>';
    this.html += '<br/><div class="spinning-wheel center"></div><br/><br/><br/>';
    this.html += '</div>';

    this.elementViewScreen.innerHTML = this.html;
  }

  /**
   * Render the game ending.
   */
  renderEnding(arg) {
    let data = JSON.parse(arg);
    
    this.html = ''; 
    this.html += '<div class="center">';

    this.html += '<h1 class="display-3">' + this.modelMessages.data.winnerIs + (data.player1win ? "Player 1 - " + data.player1Name : "Player 2 - " + data.player2Name) + '</h1>';
    this.html += '<h1 class="display-3">' + this.modelMessages.data.loserIs + (data.player1win ? "Player 2 - " + data.player2Name : "Player 1 - " + data.player1Name) + '</h1>';

    // Restart button.
    this.html += '<button id="btn_restart" type="button" class="btn-primary btn-lg">Restart</button>';

    this.html += '</div>';
    this.elementViewScreen.innerHTML = this.html;

    this.elementViewScreen.querySelector('#btn_restart').addEventListener('click', this.onClickButtonRestart);
  }
}




