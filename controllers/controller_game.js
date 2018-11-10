/*
* <BCIT COMP4711 Assignment1 - Multiplayer Tank Game>
* Copyright (C) Jake Jonghun Choi A00982751 - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Written by Jake Jonghun Choi <jchoi179@my.bcit.ca>
*/

class ControllerGame {

  /**
  * Constructor of the class.
  */
  constructor(modelGame, viewGame) {
    this.modelGame = modelGame;
    this.viewGame= viewGame;
    
    this.viewGame.onClickButtonRestart = this.onClickButtonRestart.bind(this);
   
    this.viewGame.onClickButtonAimLeft = this.onClickButtonAimLeft.bind(this);
    this.viewGame.onClickButtonAimRight = this.onClickButtonAimRight.bind(this);
    this.viewGame.onClickButtonMoveLeft = this.onClickButtonMoveLeft.bind(this);
    this.viewGame.onClickButtonMoveRight = this.onClickButtonMoveRight.bind(this);
    this.viewGame.onClickButtonFireMissile = this.onClickButtonFireMissile.bind(this);
 
    this.init();
  }

  /**
   * Initialize the controller and render the view.
   */
  init() {
    this.viewGame.renderWaitOtherPlayer();

    this.socket = io();

    this.socket.on('game_begin', (arg) => {
      this.viewGame.render();
      this.viewGame.renderGame(arg);
    });

    this.socket.on('update', (arg) => {
      this.viewGame.renderGame(arg);    
    });

    this.socket.on('game_end', (arg) => {
      this.viewGame.renderEnding(arg);    
    });

    this.socket.on('force_disconnect', (arg) => {
      this.socket.disconnect();
    });

    this.socket.on('other_disconnect', (arg) => {
      this.viewGame.renderWaitOtherPlayer();
    });

    window.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 65: // a (Left).
          this.moveLeft(0);
        break;

        case 68: // d (Right).
          this.moveRight(0);
        break;
         
        case 81: // q (Turret Left).
          this.rotateTurretLeft(0);
        break;
 
        case 69: // e (Turret Right).
          this.rotateTurretRight(0);
        break;
 
        case 87: // w (Fire).
          this.fire(0);
        break;
      }
    }, false);
  }

  /**
   * Move the player's tank left.
   */
  moveLeft(arg) {
    this.socket.emit('moveLeft', arg);
  }

  /**
   * Move the player's tank right.
   */
  moveRight(arg) {
    this.socket.emit('moveRight', arg);
  }

  /**
   * Rotate the turret left.
   */
  rotateTurretLeft(arg) {
    this.socket.emit('rotateTurretLeft', arg);
  }

  /**
   * Rotate the turret right.
   */
  rotateTurretRight(arg) {
    this.socket.emit('rotateTurretRight', arg);
  }

  /**
   * Fire the missile.
   */
  fire(arg) {
    this.socket.emit('fire', arg);
  }

  /**
   * Event handler for the restart button.
   */
  onClickButtonRestart() {
    window.location.href = "./";
  }
      
  /**
   * Event handler for the controller button.
   */
  onClickButtonAimLeft() {
    this.rotateTurretLeft(0);
  }

  /**
   * Event handler for the controller button.
   */
  onClickButtonAimRight() {
    this.rotateTurretRight(0);
  }

  /**
   * Event handler for the controller button.
   */
  onClickButtonMoveLeft() {
    this.moveLeft(0);
  }

  /**
   * Event handler for the controller button.
   */
  onClickButtonMoveRight() {
    this.moveRight(0);
  }

  /**
   * Event handler for the controller button.
   */
  onClickButtonFireMissile() {
    this.fire(0);
  }

}
