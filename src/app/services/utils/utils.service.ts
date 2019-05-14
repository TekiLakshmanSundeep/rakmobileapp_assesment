import { Injectable } from '@angular/core';
import { ToastController, NavController, AlertController, LoadingController, Events } from '@ionic/angular';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loader: any;
  previousStatus:any

  constructor(private toastCtrl: ToastController, private router: Router, private events:Events ,private alertCtrl: AlertController,public loadingController: LoadingController,
    private network:Network) { this.previousStatus = ConnectionStatusEnum.Online; }
 

  async showToastMessage(toastMessage: string, toastDuration: number) {
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration: toastDuration
    });
    toast.present();
  }
  navigateComponent(navControl: NavController, componentName: string, type: string) {
    type == 'Forward' ? navControl.navigateForward('/' + componentName) : navControl.navigateBack('/' + componentName);

  }
  navigateComponentWithParams(router_comp: Router, componentName: string, params: any) {
    router_comp.navigate([componentName], params);
  }
  fetchRouterParams(activatedRoute: ActivatedRoute, router: Router): any {

    activatedRoute.queryParams.subscribe(params => {
      return router.getCurrentNavigation().extras.state;
    })

  }
  async presentAlert(header: string, message: string, buttons: string[]) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons
    });

    await alert.present();
  }
  async presentLoading(loading_message: any, loading_type: any) {
    this.loader = await this.loadingController.create({
      translucent: true,
      message: loading_message,
      spinner: loading_type,
      showBackdrop: true,
      backdropDismiss: false,

    });
    await this.loader.present();
  }
  async dismissLoading() {
    await this.loader.dismiss();
  }
  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        this.events.publish('network:offline');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        this.events.publish('network:online');
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }
}
