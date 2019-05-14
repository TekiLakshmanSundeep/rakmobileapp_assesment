import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlbumPhotosPage } from './album-photos.page';


const routes: Routes = [
  {
    path: '',
    component: AlbumPhotosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlbumPhotosPage]
})
export class AlbumPhotosPageModule {}
