import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Wall } from 'wall';
import { Crate } from 'crate';
import { Player } from 'player';
import { Levels } from 'levels';
import { Ground } from 'ground';
import { Endpoint } from 'endpoint';

import { map } from 'rxjs/operators';

declare let Phaser;

let that;
let game;
let player;
let aliens;
let cursors;
let gestures;
let walls = [];
let crates = [];
let endpoints = [];

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {
  public levels: Array<Object> = Levels;
  public level: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.level = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.level) {
      this.loadLevel();
    }
  }

  loadLevel() {
    this.getLevel();

    this.loadGame();
  }

  getLevel() {
    let url = 'assets/data/' + this.level + '.json'
    this.http.get(url)
      .subscribe(json => {
        json["walls"].forEach(function (wall) {
          walls.push(new Wall(wall));
        });
        json["crates"].forEach(function (crate) {
          crates.push(new Crate(crate));
        });
        json["endpoints"].forEach(function (endpoint) {
          endpoints.push(new Endpoint(endpoint));
        });
        player = new Player(json["start"]);
      });
  }

  onPan(event) {
    console.log(event)
  }

  loadGame() {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-level',
      { preload: this.preload, create: this.create, update: this.update, render: this.render });
    that = Object.create(this.constructor.prototype);
  }

  create() {
    game.world.setBounds(0, 0, 1920, 1920);
    game.input.maxPointers = 1

    game.input.onUp.add(function() {
      let startPointer = arguments[0].positionDown
      let endPointer = arguments[1]

      let x = game.camera.x;
      let y = game.camera.y;

      x += startPointer.x - endPointer.x;
      y += startPointer.y - endPointer.y;

      game.camera.setPosition(x,y)
    });

    walls.forEach(function (wall) {
      let image = game.add.image(wall.x, wall.y, wall.sprite());
      image.width = 59;
      image.height = 59;
    });

    crates.forEach(function (crate) {
      let image = game.add.image(crate.x, crate.y, crate.sprite());
      image.width = 59;
      image.height = 59;
    });

    endpoints.forEach(function (endpoint) {
      let image = game.add.image(endpoint.x, endpoint.y, endpoint.sprite());
      image.width = 20;
      image.height = 20;
    });

    player = game.add.sprite(player.x, player.y, player.sprite());

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
  }

  preload() {
    Wall.load(game);
    Crate.load(game);
    Ground.load(game);
    Player.load(game);
    Endpoint.load(game);
  }

  update() {
    //game.physics.arcade.collide(player, layer);

    //player.body.velocity.x = 0;

    //if (cursors.left.isDown) {
    //  player.body.velocity.x = -150;

    //  if (facing != 'left') {
    //    player.animations.play('left');
    //    facing = 'left';
    //  }
    //} else if (cursors.right.isDown) {
    //  player.body.velocity.x = 150;

    //  if (facing != 'right') {
    //    player.animations.play('right');
    //    facing = 'right';
    //  }
    //} else {
    //  if (facing != 'idle') {
    //    player.animations.stop();

    //    if (facing == 'left') {
    //      player.frame = 0;
    //    } else {
    //      player.frame = 5;
    //    }

    //    facing = 'idle';
    //  }
    //}

    //if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
    //  player.body.velocity.y = -250;
    //  jumpTimer = game.time.now + 750;
    //}
  }

  render() {
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
