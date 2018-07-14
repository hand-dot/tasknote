import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Task } from '../common/interfaces';
import { map } from 'rxjs-compat/operators/map';
import { Observable } from 'rxjs';
import { Status, Weekday } from '../common/constants';

@Injectable()
export class SharedService {
    user: User;

    constructor(private angularFirestore: AngularFirestore) {
    }

    initializeUser({ user, isNewUser = false }: { user: User, isNewUser: boolean }): Promise<void> {
        this.user = user;
        return isNewUser
            ? this.angularFirestore
                .collection('users')
                .doc(user.uid)
                .collection('user')
                .doc(user.uid)
                .set(user)
            : Promise.resolve();
    }

    userToObservable(): Observable<User> {
        return this.angularFirestore
            .collection('users')
            .doc(this.user.uid)
            .collection('user')
            .doc(this.user.uid)
            .valueChanges()
            .pipe(map(actions => actions as User));
    }

    tasksToObservable(): Observable<Task[]> {
        return this.angularFirestore
            .collection('users')
            .doc(this.user.uid)
            .collection('tasks')
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Task;
                const id = a.payload.doc.id;
                return { id, ...data };
            })));
    }


    addTask(task: Task) {
        const firestoreId = this.angularFirestore.createId();
        this.angularFirestore
            .collection('users')
            .doc(this.user.uid)
            .collection('tasks')
            .add({
                taskId: '0001',
                uid: this.user.uid,
                title: 'Final Fantasy',
                content: 'Listen to my story',
                place: 'For the Fifteenth',
                status: Status.Canceled,
                schedule: { date: new Date(), weekday: Weekday.Friday, interval: 10 },
                likes: [{ uid: '', likeId: '' }],
                comments: [{ uid: '', commentId: '', comment: '' }],
                createdAt: new Date()
            });
    }


}