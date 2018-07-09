import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';

import { Status, Weekday } from '../../common/constants';


@Component({
  selector: 'tasks',
  templateUrl: 'tasks.html'
})
export class Tasks {
  constructor(public navCtrl: NavController, private navParams: NavParams, private sharedService: SharedService) {
    // const taskRef = this.angularFireDatabase.list<Task>(`/users/${this.user.uid}`);
    // taskRef.push(task);

    // sharedService.addTask({
    //   taskId: '0001',
    //   uid: this.sharedService.user.uid,
    //   title: 'Final Fantasy',
    //   content: 'Listen to my story',
    //   place: 'For the Fifteenth',
    //   status: Status.Canceled,
    //   schedule: { date: new Date(), weekday: Weekday.Friday, interval: 10 },
    //   likes: [{ uid: '', likeId: '' }],
    //   comments: [{ uid: '', commentId: '', comment: '' }],
    //   createdAt: new Date()
    // });
  }
}
