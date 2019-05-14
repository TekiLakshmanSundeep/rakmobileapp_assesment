import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsersList() {
    return this.http.get(Constants.USERS_URL);
  }

  getUserImages(user_id:any){
    return this.http.get(Constants.USER_IMG_URL+"150?img="+user_id);
  }

  getUserPosts(user_id:any){
    return this.http.get(Constants.USER_POSTS_URL+user_id);
  }

  getUserPhotoAlbums(user_id:any){
        return this.http.get(Constants.USER_PHOTO_ALBUMS_URL+user_id);
  }

  getUserTodos(user_id:any){
    return this.http.get(Constants.USER_TODOS_URL+user_id);
  }

  getUserAlbumPhotos(albumId:any){
    return this.http.get(Constants.USER_PHOTOS_URL+albumId);
  }
}
