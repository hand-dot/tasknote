import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Task } from '../common/interfaces';
import { map } from 'rxjs-compat/operators/map';
import { Observable } from 'rxjs';

@Injectable()
export class SharedService {
    user: Observable<User>;
    tasks: Observable<Task[]>;
    userCollection: AngularFirestoreCollection<String>;

    constructor(private angularFirestore: AngularFirestore) {
        this.userCollection = this.angularFirestore.collection('users');
        //   this.sharedService.userCollection.doc(user.uid).collection('profile')
    }

    initializeUser({ user, isNewUser = false }: { user: User, isNewUser: boolean }) {
        const promise: Promise<void> = isNewUser
            ? this.userCollection
                .doc(user.uid)
                .collection('user')
                .doc(user.uid)
                .set(user)
            : Promise.resolve();

        promise.then(() => {
            this.user = this.userCollection
                .doc(user.uid)
                .collection('user')
                .doc(user.uid)
                .valueChanges()
                .pipe(map(actions => actions as User));

            this.tasks = this.userCollection
                .doc(user.uid)
                .collection('tasks')
                .snapshotChanges()
                .pipe(map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Task;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                })));
        });
    }

    addTask(task: Task) {
        // this.userCollection.doc(`this.user.uid`).collection('tasks').add(task);
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


}