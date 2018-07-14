
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SharedService } from '../../services/sharedservice';
import { Observable } from 'rxjs/Observable';
import { User } from '../../common/interfaces';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {
  user: Observable<User>;
  constructor(public navCtrl: NavController, public events: Events, private sharedService: SharedService) {
    this.user = sharedService.userToObservable();
  }
}