
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedService } from './../../services/sharedservice';
import { Tasks } from './../../components/tasks/tasks';
import { Settings } from './../../components/settings/settings';

@Component({
  selector: 'tasknote',
  templateUrl: 'tasknote.html'
})
export class Tasknote {
  taskRoot = Tasks;
  settingRoot = Settings;

  constructor(public navCtrl: NavController, private sharedService: SharedService) {

  }
}