import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Constants } from '../../../services/constants';
import { HttpClient } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  public items: any = [];
  userPostList: any;
  completedTodoList: any[] = []
  pendingTodoList: any[] = [];
  postSubscription:Subscription
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService, private userService: UsersService, private http: HttpClient, private navCtrl: NavController) {
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    let userid = localStorage.getItem(Constants.USER_DETAILS_KEY)
    this.loadPosts(userid);
  }

  loadPosts(userId: any) {
    this.utils.presentLoading("Fetching posts.. Please wait", "crescent").then((success) => {
      this.postSubscription = this.http.get(Constants.USER_POSTS_URL + userId).subscribe((success) => {
        
        this.userPostList = success;
        this.utils.dismissLoading()
      }, (result) => {
        this.utils.dismissLoading()
        this.utils.showToastMessage("Some error occured while retrieving data... Please try again", 3500);
      })
    }, (error) => {
      this.utils.dismissLoading();
    })
  }


  openPostDetail(postdetails: any) {
    localStorage.setItem(Constants.POSTS_DETAILS_EKEY, JSON.stringify(postdetails))
    this.utils.navigateComponent(this.navCtrl, "post-details", "Forward");
  }

  ionViewWillLeave(){
    this.postSubscription.unsubscribe();
  }
}
