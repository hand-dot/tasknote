import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Project, Task } from '../common/interfaces';
import { map } from 'rxjs-compat/operators/map';
import { Observable } from 'rxjs';
import firebase from '../../node_modules/firebase';

@Injectable()
export class SharedService {
    user: User;

    constructor(private afs: AngularFirestore) {
    }

    public serverTimestamp(): firebase.firestore.FieldValue {
        return firebase.firestore.FieldValue.serverTimestamp()
    }

    public async initUser(user: User): Promise<void> {
        this.user = user;
        if (this.user.isNewUser) return this.createUser();
    }

    private async createUser(): Promise<void> {
        const doc = this.afs.doc(`Users/${this.user.profile.uid}`);
        return doc.set({ profile: this.user.profile, projectIds: {} });
    }

    public getUserObservable(): Observable<User> {
        const doc = this.afs.doc(`Users/${this.user.profile.uid}`);
        return doc.valueChanges().pipe(map(actions => actions as User));
    }

    public getTasksObservable(projectId: string): Observable<Task[]> {
        const collection = this.afs.collection(`Projects/${projectId}/Tasks`);
        return collection.snapshotChanges().pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data };
        })));
    }

    public async createProject(project: Project, task: Task): Promise<void> {
        const projectId = this.afs.createId();
        const projectDoc = this.afs.doc(`Projects/${projectId}`);
        const taskDoc = this.afs.doc(`Projects/${projectId}/Tasks/${this.afs.createId()}`);
        await Promise.all([projectDoc.set(project), taskDoc.set(task)]);
    }
}