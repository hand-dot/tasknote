
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
  projectUserProfiles: Promise<User[]>;
  currentProject: number = -1;

  constructor(public navCtrl: NavController, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.getUserObservable();

    this.user.subscribe(user => {
      this.projects = sharedService.getProjectsObservable(Object.keys(user.projectIds || {}));
      this.projects.forEach(projectObs => {
        projectObs.subscribe(project => {
          this.projectUserProfiles = sharedService.getUserProfiles({ userIds: Object.keys(project.userIds) });
        });
      });
    });
  }

  private selectProject(index: number): void {
    this.currentProject = index;
  }

}