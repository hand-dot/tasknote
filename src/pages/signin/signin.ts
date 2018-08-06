import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { SharedService } from './../../services/sharedservice';
import firebase from 'firebase';
import { Tasknote } from './../tasknote/tasknote';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class Signin {
  constructor(public navCtrl: NavController, public platform: Platform, public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus, public sharedService: SharedService) {

  }

  signIn() {
    const googleLogin: Promise<any> = this.platform.is('cordova')
      ? this.nativeGoogleLogin()
      : this.webGoogleLogin();

    googleLogin
      .then(userCredential => this.sharedService.initUser(userCredential))
      .then(_ => this.navCtrl.setRoot(Tasknote))
      .catch(error => { console.error('Signin error', error); })
  }

  nativeGoogleLogin(): Promise<any> {
    return this.googlePlus.login({
      'webClientId': '1081683815336-s9cv3d5lildk2ubap2vpn0gcr4tur38c.apps.googleusercontent.com',
      'offline': true
    })
      .then(result => this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken)))
  }

  webGoogleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider).then(userCredential => ({
      user: {
        id: (userCredential.additionalUserInfo.profile as any).id || '',
        uid: userCredential.user.uid,
        providerId: userCredential.additionalUserInfo.providerId || '',
        familyName: (userCredential.additionalUserInfo.profile as any).family_name || '',
        givenName: (userCredential.additionalUserInfo.profile as any).given_name || '',
        email: userCredential.user.email || '',
        phoneNumber: userCredential.user.phoneNumber || '',
        displayName: userCredential.user.displayName || '',
        photoURL: userCredential.user.photoURL || '',
        locale: (userCredential.additionalUserInfo.profile as any).locale || '',
      },
      isNewUser: userCredential.additionalUserInfo.isNewUser
    }));
  }
}
