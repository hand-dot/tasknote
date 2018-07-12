import { SharedService } from './../services/sharedservice';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { Tasknote } from '../pages/tasknote/tasknote';
import { Signin } from './../pages/signin/signin';
import { share } from '../../node_modules/rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public headerColor: HeaderColor, public angularFireAuth: AngularFireAuth, public sharedService: SharedService) {
    platform.ready().then(() => {
      this.initializeApp();
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          sharedService.initializeUser({ user, isNewUser: false });
          this.nav.setRoot(Tasknote);
        } else {
          this.nav.setRoot(Signin)
        }
      })
    });
  }

  initializeApp() {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#2c3147');
    this.headerColor.tint('#2c3147');
    this.splashScreen.hide();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

