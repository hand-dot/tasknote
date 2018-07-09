
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {

  constructor(public navCtrl: NavController, private sharedService: SharedService) {

  }
}