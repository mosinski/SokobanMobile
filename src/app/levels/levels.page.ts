import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, GestureController, Gesture } from '@ionic/angular';
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
  @ViewChild("logo", { read: ElementRef, static: true }) logo: ElementRef;

  public levels: Array<Object> = Levels;
  public level: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private gestureController: GestureController,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
      this.setupGesture();
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

  async setupGesture() {
    console.log(this.logo.nativeElement)
    const gesture: Gesture = await this.gestureController.create({
      el: this.logo.nativeElement,
      threshold: 5,
      passive: false,
      gesturePriority: 100,
      gestureName: 'my-gesture',
      onStart: () => console.log('start'),
      onMove: ev => console.log(ev),
      onEnd: ev => console.log(ev)
    }, true);
  }

  onPan(event) {
    console.log(event)
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
    game.input.onDown.add(function() {
      console.log('DOWN');
    });
    game.input.onUp.add(function() {
      console.log('UP');
    });
    game.input.onTap.add(function() {
      console.log('TAP');
    });

    walls.forEach(function (wall) {
      let image = game.add.image(wall.x, wall.y, wall.sprite());
      image.width = 59;
      image.height = 59;
    });
    //this.createWalls();
  }

  update() {
  }

  render() {
    game.debug.pointer(game.input.mousePointer);
    game.debug.pointer(game.input.pointer1);
    game.debug.pointer(game.input.pointer2);
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
