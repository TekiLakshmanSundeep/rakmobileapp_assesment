import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'user-information', loadChildren: './user-information/user-information.module#UserInformationPageModule' },
  { path: 'tabs', loadChildren: './user-dashboard/tabs/tabs.module#TabsPageModule' },
  { path: 'album-photos', loadChildren: './album-photos/album-photos.module#AlbumPhotosPageModule' },
  { path: 'post-details', loadChildren: './post-details/post-details.module#PostDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
