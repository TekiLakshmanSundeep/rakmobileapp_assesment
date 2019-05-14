import { Component } from '@angular/core';

import { Platform, Events, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilsService } from './services/utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  alert:any
  alertPresent:boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private utils: UtilsService,
    private events: Events,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.utils.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        //this.utils.presentAlert("Error", "It seems you lost network connectivity in your device. Please connect to internet", ["Ok"]);
        this.internetError();
      });

      // Online event
      this.events.subscribe('network:online', () => {
        if(this.alertPresent === true){
        this.alert.dismiss();
        
        }

      });

    });
  }

  async internetError() {
    this.alert = await this.alertController.create({
      header: 'Error',
      message: 'It seems you lost network connectivity in your device. Please connect to internet',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: (blah) => {
            this.utils.initializeNetworkEvents();
          }
        }
      ]
    });

    await this.alert.present();
    this.alertPresent = true
  }
}
