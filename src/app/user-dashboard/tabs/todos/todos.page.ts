import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Constants } from '../../../services/constants';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  postType = 'incomplete';
  userTodoList: any;
  completedTodoList: any[] = []
  pendingTodoList: any[] = []
  todosSubscription:Subscription;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService, private userService: UsersService, private http: HttpClient, private actSheet: ActionSheetController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let userid = localStorage.getItem(Constants.USER_DETAILS_KEY)
    this.loadTodos(userid);
    this.completedTodoList = [];
    this.pendingTodoList = [];
  }

  loadTodos(userId: any) {
    this.utils.presentLoading("Fetching todo list.. Please wait", "crescent").then((success) => {
      this.todosSubscription = this.http.get(Constants.USER_TODOS_URL + userId).subscribe((success) => {
        this.userTodoList = success;
        this.userTodoList.filter((item: any) => {
          if (item.completed === true) {
            this.completedTodoList.push(item)
          } else {
            this.pendingTodoList.push(item);
          }
        })
        this.utils.dismissLoading()
      }, (error) => {
        this.utils.dismissLoading()
        this.utils.showToastMessage("Some error occured while retrieving data... Please try again", 3500);
      })
    }, (error) => {
      this.utils.dismissLoading();
    })
  }
  async openTodo(todoItem: any) {
    this.utils.presentAlert("Todo Content", todoItem.title, ["Ok"])
  }
  ionViewWillLeave(){
    this.todosSubscription.unsubscribe();
  }
}
