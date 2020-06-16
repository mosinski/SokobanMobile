import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Levels } from 'levels';
import { Wall } from 'wall';

import { map } from 'rxjs/operators';

declare let Phaser;

let that;
let game;
let player;
let aliens;
let gestures;
let walls = [];

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
      });
  }

  loadGame() {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-level',
      { preload: this.preload, create: this.create, update: this.update, render: this.render });
    that = Object.create(this.constructor.prototype);
  }

  preload() {
    game.load.image('wall_beige', 'assets/sprites/walls/beige.png');
    game.load.image('wall_black', 'assets/sprites/walls/black.png');
    game.load.image('wall_brown', 'assets/sprites/walls/brown.png');
    game.load.image('wall_gray', 'assets/sprites/walls/gray.png');

    game.load.image('wall_round_beige', 'assets/sprites/walls/round_beige.png');
    game.load.image('wall_round_black', 'assets/sprites/walls/round_black.png');
    game.load.image('wall_round_brown', 'assets/sprites/walls/round_brown.png');
    game.load.image('wall_round_gray', 'assets/sprites/walls/round_gray.png');
    //this.preloadWalls();
  }

  create() {
    walls.forEach(function (wall) {
      let image = game.add.image(wall.x, wall.y, wall.sprite());
      image.width = 59;
      image.height = 59;
    });
    //this.createWalls();
  }

  handlePan($event) {
    console.log('event')
    //game.camera.y += event.velocityX;
    //game.camera.x += event.velocityY;
  }

  handleSwipe() {
  }

  update() {
  }

  render() {
  }

  preloadWalls() {
  }

  createWalls() {
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
