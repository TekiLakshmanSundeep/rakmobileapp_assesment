import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../services/utils/utils.service';
import { UsersService } from '../services/users/users.service';
import { forkJoin, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.page.html',
  styleUrls: ['./user-information.page.scss'],
})
export class UserInformationPage implements OnInit {
  data: any
  userImage: any
  posts:any;
  albums:any;
  todos:any;
  postSize:any = 0
  albumsSize:any = 0;
  todosSize:any = 0
  activitiesSubscription:Subscription;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService, private usersService: UsersService, private http:HttpClient, private photoViewer:PhotoViewer) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        let posts = this.http.get("https://jsonplaceholder.typicode.com/posts?userId="+this.data.id)
        let albums = this.http.get("https://jsonplaceholder.typicode.com/albums?userId="+this.data.id)
        let todos = this.http.get("https://jsonplaceholder.typicode.com/todos?userId="+this.data.id)
        
    this.activitiesSubscription =   forkJoin([posts,albums,todos]).subscribe((success)=>{
        
        
        this.posts = success[0];
        this.albums = success[1];
        this.todos = success[2];
        this.postSize = this.posts.length;  
        this.albumsSize = this.albums.length;  
        this.todosSize = this.todos.length;  
        
      },(error)=>{
        this.utils.showToastMessage("Some Error occured while getting user content, Please try again later",3500);
      })


      
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  ionViewWillLeave(){
    this.activitiesSubscription.unsubscribe();
  }
  openUserimage(img_url:any){
    this.photoViewer.show(img_url,this.data.name)
  }

}
