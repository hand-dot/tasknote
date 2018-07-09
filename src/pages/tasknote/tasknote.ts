
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';
import { Profile } from '../../components/profile/profile';
import { Tasks } from '../../components/tasks/tasks';
import { Settings } from '../../components/settings/settings';

@Component({
  selector: 'tasknote',
  templateUrl: 'tasknote.html'
})
export class Tasknote {
  profile: any = Profile;
  tasks: any = Tasks;
  settings: any = Settings;

  constructor(public navCtrl: NavController) {

  }
}