import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { SharedService } from './../../services/sharedservice';
import firebase from 'firebase';
import { Tasknote } from './../tasknote/tasknote';
import { User } from '../../common/interfaces';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class Signin {
  constructor(public navCtrl: NavController, public platform: Platform, public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus, public sharedService: SharedService) {

  }

  public async signIn() {
    const data: any = this.platform.is('cordova')
      ? await this.nativeGoogleLogin()
      : await this.webGoogleLogin();

    await this.sharedService.initUser(data).catch(error => { console.error('Signin error', error); });
    this.navCtrl.setRoot(Tasknote);
  }

  async nativeGoogleLogin(): Promise<any> {
    return this.googlePlus.login({
      'webClientId': '1081683815336-s9cv3d5lildk2ubap2vpn0gcr4tur38c.apps.googleusercontent.com',
      'offline': true
    })
      .then(result => this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken)))
  }

  async webGoogleLogin(): Promise<Object> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await this.angularFireAuth.auth.signInWithPopup(provider);
    return {
      user: {
        profile: {
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
        projectIds: []
      },
      isNewUser: userCredential.additionalUserInfo.isNewUser
    };
  }
}
