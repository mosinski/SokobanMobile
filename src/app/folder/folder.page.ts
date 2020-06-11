import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public audioType: string = 'html5';

  constructor(
    private activatedRoute: ActivatedRoute,
    private nativeAudio: NativeAudio,
    private platform: Platform
  ) {
    if (platform.is('cordova')) {
      this.audioType = 'native';
    }
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

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
