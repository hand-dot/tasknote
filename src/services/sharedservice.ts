import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Task } from '../common/interfaces';
import { map } from 'rxjs-compat/operators/map';
import { Observable } from 'rxjs';

@Injectable()
export class SharedService {
    user: User;
    tasks: Observable<Task[]>;
    userCollection: AngularFirestoreCollection<String>;

    constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private googlePlus: GooglePlus, platform: Platform) {
        this.userCollection = this.angularFirestore.collection('users');
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;

            const googleLogin = platform.is('cordova')
                ? this.nativeGoogleLogin()
                : this.webGoogleLogin();

            googleLogin.then(({ user: { } }) => {
                this.tasks = this.userCollection.doc(user.uid)
                    .collection('tasks')
                    .snapshotChanges()
                    .pipe(map(actions => actions.map(a => {
                        const data = a.payload.doc.data() as Task;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    })));
            }).catch(error => {
                console.error('Signin error', error);
            })
        });
    }

    addTask(task: Task) {
        this.userCollection.doc(this.user.uid).collection('tasks').add(task);
        // const firestoreId = this.angularFirestore.createId();
        // this.userCollection.doc(this.user.uid).collection('tasks').add({
        //     taskId: '0001',
        //     uid: this.user.uid,
        //     title: 'Final Fantasy',
        //     content: 'Listen to my story',
        //     place: 'For the Fifteenth',
        //     status: Status.Canceled,
        //     schedule: { date: new Date(), weekday: Weekday.Friday, interval: 10 },
        //     likes: [{ uid: '', likeId: '' }],
        //     comments: [{ uid: '', commentId: '', comment: '' }],
        //     createdAt: new Date()
        // });
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
        return this.angularFireAuth.auth.signInWithPopup(provider).then(userCredential => userCredential.user);
    }
}