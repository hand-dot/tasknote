
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { SharedService } from '../../services/sharedservice';
import { Profile } from '../../components/profile/profile';
import { Tasks } from '../../components/tasks/tasks';
import { Settings } from '../../components/settings/settings';

@Component({
  selector: 'tasknote',
  templateUrl: 'tasknote.html'
})
export class Tasknote {
  @ViewChild(SuperTabs) superTabs: SuperTabs;

  profile: any = Profile;
  tasks: any = Tasks;
  settings: any = Settings;

  constructor(public navCtrl: NavController) {

  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }
}