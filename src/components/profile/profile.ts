
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
  projectUserProfiles: Promise<any>;
  currentProject: number = -1;

  constructor(public navCtrl: NavController, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.getUserObservable();

    this.user.subscribe(user => {
      const projectIds = Object.keys(user.projectIds || {});
      this.projects = sharedService.getProjectsObservable(projectIds);
      this.projectUserProfiles = sharedService.getUserProfiles(projectIds);
      this.projectUserProfiles.then(result => console.error(result));

      // this.projects.forEach(projectObs => {
      //   projectObs.subscribe(project => {
      //   });
      // });
    });
  }

  private selectProject(index: number): void {
    this.currentProject = index;
  }

}