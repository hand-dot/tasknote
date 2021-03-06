import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';

import { GooglePlus } from '@ionic-native/google-plus';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { firebaseConfig } from './conf';

import { MyApp } from './app.component';
import { Signin } from '../pages/signin/signin';
import { Tasknote } from '../pages/tasknote/tasknote';
import { Profile } from '../components/profile/profile';
import { Tasks } from '../components/tasks/tasks';
import { Settings } from '../components/settings/settings';
import { SharedService } from '../services/sharedservice';

@NgModule({
  declarations: [
    MyApp,
    Signin,
    Tasknote,
    Profile,
    Tasks,
    Settings
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Signin,
    Tasknote,
    Profile,
    Tasks,
    Settings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HeaderColor,
    GooglePlus,
    SharedService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
