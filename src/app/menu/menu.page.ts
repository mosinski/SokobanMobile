import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public audioType: string = 'html5';

  constructor(
    private nativeAudio: NativeAudio,
    private platform: Platform
  ) {
    if (platform.is('cordova')) {
      this.audioType = 'native';
    }
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      if (this.audioType === 'html5') {
        let audio = new Audio('assets/sounds/menu.mp3');
        audio.play();
      } else {
        this.nativeAudio.preloadComplex('menu', 'assets/sounds/menu.mp3', 1, 1, 0).then(() => {
          this.nativeAudio.loop('menu');
        });
      }
    });
  }

}
