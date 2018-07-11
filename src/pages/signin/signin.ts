
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { SharedService } from './../../services/sharedservice';
import firebase from 'firebase';
import { User } from '../../common/interfaces';
import { Tasknote } from './../tasknote/tasknote';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class Signin {
  constructor(public navCtrl: NavController, public platform: Platform, public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus, public sharedService: SharedService) {

  }

  signIn() {
    const googleLogin: Promise<User> = this.platform.is('cordova')
      ? this.nativeGoogleLogin()
      : this.webGoogleLogin();

    googleLogin
      .then(user => { this.sharedService.initializeUser(user); this.navCtrl.setRoot(Tasknote); })
      .catch(error => { console.error('Signin error', error); })
  }

  nativeGoogleLogin(): Promise<User> {
    return this.googlePlus.login({
      'webClientId': '1081683815336-s9cv3d5lildk2ubap2vpn0gcr4tur38c.apps.googleusercontent.com',
      'offline': true
    })
      .then(result => this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken)))
  }

  webGoogleLogin(): Promise<User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider).then(userCredential => ({ ...userCredential.user }));
  }
}