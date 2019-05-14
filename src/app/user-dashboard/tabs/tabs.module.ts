import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs.router.module';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      { path: 'todos', loadChildren: '../../user-dashboard/tabs/todos/todos.module#TodosPageModule' },
      { path: 'posts', loadChildren: '../../user-dashboard/tabs/posts/posts.module#PostsPageModule' },
        { path: 'albums', loadChildren: '../../user-dashboard/tabs/albums/albums.module#AlbumsPageModule' },
       
       
    ]
  },
  {
    path:'',
    redirectTo:'posts',
    pathMatch:'full'
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
