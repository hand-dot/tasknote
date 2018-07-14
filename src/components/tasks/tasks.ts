import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';
import { Observable } from 'rxjs/Observable';
import { User, Task } from '../../common/interfaces';



@Component({
  selector: 'tasks',
  templateUrl: 'tasks.html'
})
export class Tasks {
  user: Observable<User>;
  tasks: Observable<Task[]>;

  constructor(public navCtrl: NavController, private navParams: NavParams, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.userToObservable();
    this.tasks = sharedService.tasksToObservable();
  }
}
