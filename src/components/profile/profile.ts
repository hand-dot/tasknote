
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';
import { Observable } from 'rxjs/Observable';
import { User, Task, ProjectDetails } from '../../common/interfaces';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {
  user: Observable<User>;
  projectDetailsObs: Observable<ProjectDetails>;
  projectDetails: ProjectDetails = {};

  constructor(public navCtrl: NavController, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.userObservable();
    this.projectDetailsObs = sharedService.projectDetailsObservable();

    this.projectDetailsObs.subscribe(data => {
      console.error(data);
      this.projectDetails.projectIds = data.projectIds;
    });
  }
}