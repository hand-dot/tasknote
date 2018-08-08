import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';
import { Observable } from 'rxjs/Observable';
import { User, Task } from '../../common/interfaces';

import { Profile } from '../../components/profile/profile';
import { Settings } from '../../components/settings/settings';
import { Weekday, Status } from '../../common/constants';

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.html'
})
export class Tasks {
  user: Observable<User>;
  tasks: Observable<Task[]>;

  running: any = Settings;
  favorites: any = Settings;
  featured: any = Settings;
  settings: any = Settings;


  constructor(public navCtrl: NavController, private navParams: NavParams, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.getUserObservable();
    sharedService.createProject(
      {
        userIds: { [this.sharedService.user.profile.uid]: true },
        createdAt: sharedService.serverTimestamp()
      },
      {
        userId: sharedService.user.profile.uid,
        title: 'UI・UX Design',
        content: 'Listen to my story',
        tag: '',
        place: 'in Tokyo',
        status: Status.Canceled,
        schedule: { date: new Date(), weekday: Weekday.Friday, interval: 10 },
        comments: [{ userId: '', comment: '', createdAt: new Date() }],
        createdAt: sharedService.serverTimestamp()
      }
    );
  }
}
