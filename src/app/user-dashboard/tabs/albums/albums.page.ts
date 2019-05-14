import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Constants } from '../../../services/constants';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  data: any
  userAlbumsList: any
  albumSubscription:Subscription
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService, private userService: UsersService, private navCtrl: NavController) {

  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let userid = localStorage.getItem(Constants.USER_DETAILS_KEY)
    this.loadAlbums(userid);
  }

  loadAlbums(userId: any) {
    this.utils.presentLoading("Fetching albums.. Please wait", "crescent").then((success) => {
      this.albumSubscription = this.userService.getUserPhotoAlbums(userId).subscribe((success) => {
        this.utils.dismissLoading();
        this.userAlbumsList = success;
      }, (error) => {
        this.utils.dismissLoading();
        this.utils.showToastMessage("Some error occured while retrieving data... Please try again", 3500);
      })
    },(error)=>{
      this.utils.dismissLoading();
    })
  }

  openUserAlbum(albumContent: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        album: albumContent
      }
    };
    localStorage.setItem(Constants.ALBUM_DETAILS_KEY, JSON.stringify(albumContent.id));
    this.utils.navigateComponent(this.navCtrl, 'album-photos', "Forward");
  }
  ionViewWillLeave(){
    this.albumSubscription.unsubscribe();
  }
}
