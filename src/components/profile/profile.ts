
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';
import { Observable } from 'rxjs/Observable';
import { User, Task, Project } from '../../common/interfaces';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {
  user: Observable<User>;
  projects: Observable<Project>[] = [];
  currentProject: number = -1;

  constructor(public navCtrl: NavController, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.getUserObservable();
    this.projects = sharedService.getProjectsObservable(Object.keys(sharedService.user.projectIds || {}));
    // this.projectDetailsObs.subscribe(data => {
    //   console.error(data);
    //   this.projectDetails.projectIds = data.projectIds;
    // });
  }

  private selectProject(index: number): void {
    this.currentProject = index;
  }

}