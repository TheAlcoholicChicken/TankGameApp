/*
* <BCIT COMP4711 Assignment1 - Multiplayer Tank Game>
* Copyright (C) Jake Jonghun Choi A00982751 - All Rights Reserved.
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Written by Jake Jonghun Choi <jchoi179@my.bcit.ca>
*/

class ModelTanks {

  constructor(player1Id, player1Name, player2Id, player2Name) {

    this.data = {};

    // Constants for the players.
    this.ENV_WIDTH = 800;
    this.ENV_HEIGHT = 600;
    this.PLAYER_RADIUS = 50;
    this.PLAYER_TURRET_LENGTH = 75;
    this.MISSILE_RADIUS = 15;

    // Player 1.
    this.data.player1 = {};
    this.data.player1.id = player1Id;
    this.data.player1.name = player1Name;
    this.data.player1.x = this.ENV_WIDTH / 2;
    this.data.player1.y = 100;
    this.data.player1.r = this.PLAYER_RADIUS;
    this.data.player1.lives = 3;
    this.data.player1.coolDown = 0;
    
    this.data.player1.turretAngle = 0;
    this.data.player1.turretX = this.ENV_WIDTH / 2; 
    this.data.player1.turretY = this.data.player1.y + this.PLAYER_TURRET_LENGTH; 

    this.data.player1.missiles = [];

    // Player 2.
    this.data.player2 = {};
    this.data.player2.id = player2Id;
    this.data.player2.name = player2Name;
    this.data.player2.x = this.ENV_WIDTH / 2;
    this.data.player2.y = 500;
    this.data.player2.r = this.PLAYER_RADIUS;
    this.data.player2.lives = 3;
    this.data.player2.coolDown = 0;
 
    this.data.player2.turretAngle = 0;
    this.data.player2.turretX = this.ENV_WIDTH / 2;
    this.data.player2.turretY = this.data.player2.y - this.PLAYER_TURRET_LENGTH; 

    this.data.player2.missiles = [];

  }

}

module.exports = ModelTanks;