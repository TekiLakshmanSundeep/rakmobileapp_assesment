import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../services/utils/utils.service';
import { UsersService } from '../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Constants } from '../../app/services/constants'
@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.page.html',
  styleUrls: ['./album-photos.page.scss'],
})
export class AlbumPhotosPage implements OnInit {
  photosData: any;
  photosList:any;
  galleryType = 'regular';
  isLoadingCompleted:boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private utils: UtilsService, private router: Router, private userservice: UsersService, private http:HttpClient,private photoViewer: PhotoViewer) {
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let albumId = localStorage.getItem(Constants.ALBUM_DETAILS_KEY);
    this.loadPhotos(albumId);
  }

  loadPhotos(albumId: any) {
    this.http.get("https://jsonplaceholder.typicode.com/photos?albumId="+albumId).subscribe((success)=>{
      this.photosList = success;
      this.isLoadingCompleted = true;
    },(error)=>{
      this.isLoadingCompleted = true;
      this.utils.showToastMessage("Some error occured while retrieving data... Please try again", 3500);
    })
  }
  openPhotoViewer(photoData:any){
    //TO VIEW THE PHOTOS USED THE PHOTO VIEWER PLUGIN DOsWNLOADED FROM https://ionicframework.com/docs/native/photo-viewer
    this.photoViewer.show(photoData.url,photoData.title);
  }
}
