import { Component, OnInit } from '@angular/core';
import { Constants } from '../services/constants';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../services/utils/utils.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  postTitle: string = "Loading...";
  postBody: string = "Loading...";
  postId: any;
  commentsList: any;
  isLoadingCompleted: boolean = false
  constructor(private http: HttpClient, private utils: UtilsService, private loadingCtrl:LoadingController) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    let postDetailData = JSON.parse(localStorage.getItem(Constants.POSTS_DETAILS_EKEY));
    this.getPostDetails(postDetailData);
  }

  getPostDetails(_postDetails: any) {
    this.postTitle = _postDetails.title;
    this.postBody = _postDetails.body;
    this.loadPostComments(_postDetails.id);
  }

  loadPostComments(postId: any) {
    
    this.http.get(Constants.USER_POST_COMMENTS + postId).subscribe((success) => {
      this.commentsList = success
      this.isLoadingCompleted = true;
    }, (error) => {
      this.isLoadingCompleted = true;
      this.utils.showToastMessage("Some error occured while retrieving data... Please try again", 3500);
    })


  }
}
