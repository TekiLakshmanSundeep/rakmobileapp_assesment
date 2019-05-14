import { Component } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilsService } from '../services/utils/utils.service';
import { NavController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { Constants } from '../../../src/app/services/constants'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoadingCompleted: boolean = false;
  usersData: any;
  usersArr: any[] = [];
  homeSubscription:Subscription;
  constructor(private users: UsersService, private inAppBrowser: InAppBrowser, private utils: UtilsService, private navCtrl: NavController, private callNumber: CallNumber, private router: Router) {

  }
  ionViewWillEnter() {
    this.usersArr = [];
    this.getUsersList();
  }
  getUsersList() {
    this.homeSubscription = this.users.getUsersList().subscribe((success) => {
      this.isLoadingCompleted = true;
      this.usersData = success;
      this.usersData.map((item:any)=>{
        item['image_url'] = Constants.USER_IMG+item.id;
          this.usersArr.push(item);
      })
    }, (error) => {
      this.isLoadingCompleted = true;
    })
  }
  openUserUtils(utilType: any, params: any) {
    
    let navigationExtras: NavigationExtras = {
      state: {
        user: params
      }
    };
    if (utilType === "dashboard") {
      localStorage.setItem(Constants.USER_DETAILS_KEY,JSON.stringify(params.id));
      this.utils.navigateComponent(this.navCtrl,'tabs/posts',"Forward");
    } else {
      //NAVIGATING USING ROUTER PARAMERS
      this.utils.navigateComponentWithParams(this.router, 'user-information', navigationExtras);
    }
  }
  ionViewWillLeave(){
    this.homeSubscription.unsubscribe();
  }
}
