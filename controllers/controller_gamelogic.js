/*
* <BCIT COMP4711 Assignment1 - Multiplayer Tank Game>
* Copyright (C) Jake Jonghun Choi A00982751 - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Written by Jake Jonghun Choi <jchoi179@my.bcit.ca>
*/

/**
 * Game related constants .
 */
const COOL_DOWN_SPEED = 2; // Cool down speed of the weapon.
const MOVE_AMOUNT = 10; // How much the tank should be moved.
const MOVE_OFFSET = 30; // The end of the screen for the movement.
const TURRET_ROTATE_AMOUNT = 3; // How much the turret should be rotated.
const TURRET_ROTATE_LIMIT = 45; // Limitation on the turret rotation.
const MISSILE_VELOCITY = 10; // Speed of the individual missiles.
const MISSILE_CONTACT_DISTANCE = 1.5; // Contact distance factor of missiles.

class GameLogic {
  
  /**
   * Move the player's tank left.
   */
  static moveLeft(socket, modelTanks) {
    if (modelTanks.data.player1.id === socket.id) {
      if (modelTanks.data.player1.x >= MOVE_OFFSET) {
        modelTanks.data.player1.x -= MOVE_AMOUNT; 
        this.updateTurretPosition(socket, modelTanks);
      }
    } else if (modelTanks.data.player2.id === socket.id) {
      if (modelTanks.data.player2.x >= MOVE_OFFSET) {
        modelTanks.data.player2.x -= MOVE_AMOUNT; 
        this.updateTurretPosition(socket, modelTanks);
      }
    }
  }
  
  /**
   * Move the player's tank right.
   */
  static moveRight(socket, modelTanks) {
    if (modelTanks.data.player1.id === socket.id) {
      if (modelTanks.data.player1.x <= modelTanks.ENV_WIDTH - MOVE_OFFSET) {
        modelTanks.data.player1.x += MOVE_AMOUNT; 
        this.updateTurretPosition(socket, modelTanks);
      }
    } else if (modelTanks.data.player2.id === socket.id) {
      if (modelTanks.data.player2.x <= modelTanks.ENV_WIDTH - MOVE_OFFSET) {
        modelTanks.data.player2.x += MOVE_AMOUNT; 
        this.updateTurretPosition(socket, modelTanks);
      }
    }
  }
  
  /**
   * Rotate the turret left.
   */
  static rotateTurretLeft(socket, modelTanks) {
    if (modelTanks.data.player1.id === socket.id) {
      if (modelTanks.data.player1.turretAngle > -1 * TURRET_ROTATE_LIMIT) {
        modelTanks.data.player1.turretAngle -= TURRET_ROTATE_AMOUNT;
        this.updateTurretPosition(socket, modelTanks);
      }
    } else if (modelTanks.data.player2.id === socket.id) {
      if (modelTanks.data.player2.turretAngle > -1 * TURRET_ROTATE_LIMIT) {
        modelTanks.data.player2.turretAngle -= TURRET_ROTATE_AMOUNT;
        this.updateTurretPosition(socket, modelTanks);
      }
    }
  }
  
  /**
   * Rotate the turret right.
   */
  static rotateTurretRight(socket, modelTanks) {
    if (modelTanks.data.player1.id === socket.id) {
      if (modelTanks.data.player1.turretAngle < TURRET_ROTATE_LIMIT) {
        modelTanks.data.player1.turretAngle += TURRET_ROTATE_AMOUNT;
        this.updateTurretPosition(socket, modelTanks);
      }
    } else if (modelTanks.data.player2.id === socket.id) {
      if (modelTanks.data.player2.turretAngle < TURRET_ROTATE_LIMIT) {
        modelTanks.data.player2.turretAngle += TURRET_ROTATE_AMOUNT;
        this.updateTurretPosition(socket, modelTanks);
      }
    }
  }

  /**
   * Update the position of the turret.
   */
  static updateTurretPosition(socket, modelTanks) {
    if (modelTanks.data.player1.id === socket.id) {
      let coordinates 
        = this.calculateTurretEndPoint(modelTanks.data.player1.turretAngle,  
                                       modelTanks.PLAYER_TURRET_LENGTH);
      modelTanks.data.player1.turretX  
        = modelTanks.data.player1.x + coordinates[0];
      modelTanks.data.player1.turretY 
        = modelTanks.data.player1.y + coordinates[1]; 
    } else if (modelTanks.data.player2.id === socket.id) {
      let coordinates 
        = this.calculateTurretEndPoint(modelTanks.data.player2.turretAngle,  
                                       modelTanks.PLAYER_TURRET_LENGTH);

      modelTanks.data.player2.turretX  
        = modelTanks.data.player2.x + coordinates[0];
      modelTanks.data.player2.turretY 
        = modelTanks.data.player2.y - coordinates[1]; 
    }
  }

  /**
   * Calculate the end point of the turret.
   */
  static calculateTurretEndPoint(degree, length) {
    
    // Degree to Radian first.
    let radian = degree * Math.PI / 180;
    
    let x = length * Math.sin(radian);
    let y = length * Math.cos(radian);

    return [x, y];
  }

  /**
   * Reduce the cool down for one time unit.
   */
  static coolDown(socket, modelTanks) {
    
    if (modelTanks.data.player1.coolDown > 0) {
      modelTanks.data.player1.coolDown -= COOL_DOWN_SPEED;
    } else if (modelTanks.data.player1.coolDown == 0) {
      modelTanks.data.player1.coolDown = 0;
    }
    if (modelTanks.data.player2.coolDown > 0) {
      modelTanks.data.player2.coolDown -= COOL_DOWN_SPEED;
    } else if (modelTanks.data.player2.coolDown == 0) {
      modelTanks.data.player2.coolDown = 0;
    }

  }

  /**
   * Fire the missile.
   */
  static fire(socket, modelTanks) {
    if (modelTanks.data.player1.id === socket.id) {
      if (modelTanks.data.player1.coolDown === 0) {
        let coordinates 
          = this.getUnitVector(modelTanks.data.player1.x,
                               modelTanks.data.player1.y,
                               modelTanks.data.player1.turretX,
                               modelTanks.data.player1.turretY,
                               modelTanks.PLAYER_TURRET_LENGTH);
        let missile = {
          "x": modelTanks.data.player1.turretX,
          "y": modelTanks.data.player1.turretY,
          "xUnitVector": coordinates[0],
          "yUnitVector": coordinates[1],
          "radius": modelTanks.MISSILE_RADIUS,
          "alive": true
        };
        modelTanks.data.player1.missiles.push(missile);
        modelTanks.data.player1.coolDown = 100;
      }
    } else if (modelTanks.data.player2.id === socket.id) {
      if (modelTanks.data.player2.coolDown === 0) {
        let coordinates 
          = this.getUnitVector(modelTanks.data.player2.x,
                               modelTanks.data.player2.y,
                               modelTanks.data.player2.turretX,
                               modelTanks.data.player2.turretY,
                               modelTanks.PLAYER_TURRET_LENGTH);
        let missile = {
          "x": modelTanks.data.player2.turretX,
          "y": modelTanks.data.player2.turretY,
          "xUnitVector": coordinates[0],
          "yUnitVector": coordinates[1],
          "radius": modelTanks.MISSILE_RADIUS,
          "alive": true
        };
        modelTanks.data.player2.missiles.push(missile);
        modelTanks.data.player2.coolDown = 100;
      }
    }
  }

  /**
   * Process all missiles for one time unit.
   */
  static processMissiles(socket, modelTanks) {

    // For player 1's missiles contact.
    for (let i = 0; i < modelTanks.data.player1.missiles.length; i++) {
      var boolMetMissiles = false;
      for (let j = 0; j < modelTanks.data.player2.missiles.length; j++) {
        if (MISSILE_CONTACT_DISTANCE * modelTanks.MISSILE_RADIUS
          > this.getDistance(modelTanks.data.player1.missiles[i].x,
                             modelTanks.data.player1.missiles[i].y,
                             modelTanks.data.player2.missiles[j].x,
                             modelTanks.data.player2.missiles[j].y)) {
          boolMetMissiles = true;
        } 
      }
    } 

    // For player 2's missiles contact.
    for (let i = 0; i < modelTanks.data.player2.missiles.length; i++) {
      var boolMetMissiles = false;
      for (let j = 0; j < modelTanks.data.player1.missiles.length; j++) {
        if (MISSILE_CONTACT_DISTANCE * modelTanks.MISSILE_RADIUS
          > this.getDistance(modelTanks.data.player2.missiles[i].x,
                             modelTanks.data.player2.missiles[i].y,
                             modelTanks.data.player1.missiles[j].x,
                             modelTanks.data.player1.missiles[j].y)) {
          boolMetMissiles = true;
        } 
      }
    } 

    // For player 1's missiles.
    for (let i = 0; i < modelTanks.data.player1.missiles.length; i++) {
      // Move the missile.
      modelTanks.data.player1.missiles[i].x 
        += MISSILE_VELOCITY * modelTanks.data.player1.missiles[i].xUnitVector;
      modelTanks.data.player1.missiles[i].y 
        += MISSILE_VELOCITY * modelTanks.data.player1.missiles[i].yUnitVector;

      // Set up all the conditions that the missile should be removed.
      let boolDamaged 
        = (modelTanks.PLAYER_RADIUS 
          > this.getDistance(modelTanks.data.player1.missiles[i].x,
                             modelTanks.data.player1.missiles[i].y,
                             modelTanks.data.player2.x,
                             modelTanks.data.player2.y)) 
          ? true : false;

      let boolOutOfScreen
        = (modelTanks.data.player1.missiles[i].x < 0
            || modelTanks.data.player1.missiles[i].x > modelTanks.ENV_WIDTH 
            || modelTanks.data.player1.missiles[i].y < 0
            || modelTanks.data.player1.missiles[i].y > modelTanks.ENV_HEIGHT)
          ? true : false;

      if (boolDamaged || boolOutOfScreen || boolMetMissiles) {
        modelTanks.data.player1.missiles[i].alive = false; 
      } 

      // Damage operation.
      if (boolDamaged) {
        modelTanks.data.player2.lives--;
      }

    }
   
    // For player 2's missiles.
    for (let i = 0; i < modelTanks.data.player2.missiles.length; i++) {
      // Move the missile.
      modelTanks.data.player2.missiles[i].x 
        += MISSILE_VELOCITY * modelTanks.data.player2.missiles[i].xUnitVector;
      modelTanks.data.player2.missiles[i].y 
        += MISSILE_VELOCITY * modelTanks.data.player2.missiles[i].yUnitVector;

      // Set up all the conditions that the missile should be removed.
      let boolDamaged 
        = (modelTanks.PLAYER_RADIUS 
          > this.getDistance(modelTanks.data.player2.missiles[i].x,
                             modelTanks.data.player2.missiles[i].y,
                             modelTanks.data.player1.x,
                             modelTanks.data.player1.y)) 
          ? true : false;

      let boolOutOfScreen
        = (modelTanks.data.player2.missiles[i].x < 0
            || modelTanks.data.player2.missiles[i].x > modelTanks.ENV_WIDTH 
            || modelTanks.data.player2.missiles[i].y < 0
            || modelTanks.data.player2.missiles[i].y > modelTanks.ENV_HEIGHT)
          ? true : false;

      if (boolDamaged || boolOutOfScreen || boolMetMissiles) {
        modelTanks.data.player2.missiles[i].alive = false; 
      } 

      // Damage operation.
      if (boolDamaged) {
        modelTanks.data.player1.lives--;
      }
    }

    // Remove the dead missiles for player 1.
    let updatedMissilesPlayer1 = []
    for (let i = 0; i < modelTanks.data.player1.missiles.length; i++) {
      if (modelTanks.data.player1.missiles[i].alive) {
        updatedMissilesPlayer1.push(modelTanks.data.player1.missiles[i]);
      }
    }
    modelTanks.data.player1.missiles = updatedMissilesPlayer1; 
   
    // Remove the dead missiles for player 2.
    let updatedMissilesPlayer2 = []
    for (let i = 0; i < modelTanks.data.player2.missiles.length; i++) {
      if (modelTanks.data.player2.missiles[i].alive) {
        updatedMissilesPlayer2.push(modelTanks.data.player2.missiles[i]);
      }
    }
    modelTanks.data.player2.missiles = updatedMissilesPlayer2; 
    
  }

  /**
   * Return the unit vector of the turret for missile processing.
   */
  static getUnitVector(x0, y0, x1, y1, length) {
    let x_new = (x1 - x0) / length;
    let y_new = (y1 - y0) / length;
    return [x_new, y_new];
  }

  /**
   * Return the distance between two points. 
   */
  static getDistance(x0, y0, x1, y1) {
    let distance = Math.sqrt(Math.pow((x0 - x1), 2) + Math.pow((y0 - y1), 2));
    return distance;
  }
}

module.exports = GameLogic;
