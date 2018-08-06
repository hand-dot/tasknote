import { ProjectDetails } from './../common/interfaces';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Project, Task, ProjectDetails } from '../common/interfaces';
import { map } from 'rxjs-compat/operators/map';
import { Observable as ObservableCompat } from 'rxjs-compat';
import { Observable } from 'rxjs';
import { Status, Weekday } from '../common/constants';

@Injectable()
export class SharedService {
    user: User;

    constructor(private angularFirestore: AngularFirestore) {
    }

    initUser({ user, isNewUser = false }: { user: User, isNewUser: boolean }): Promise<void> {
        this.user = user;
        return isNewUser
            ? this.createUser()
            : Promise.resolve();
    }

    private createUser(): Promise<any> {
        return this.angularFirestore
            .collection('Users')
            .doc(this.user.uid)
            .set(this.user)
            .then(_ => {
                this.angularFirestore
                    .collection('ProjectDetails')
                    .doc('ByUser')
                    .collection('Users')
                    .doc(this.user.uid)
                    .set({ projectIds: [] });
            });
    }

    public userObservable(): Observable<User> {
        return this.angularFirestore
            .collection('Users')
            .doc(this.user.uid)
            .valueChanges()
            .pipe(map(actions => actions as User));

    }

    public projectDetailsObservable(): Observable<ProjectDetails> {
        return this.angularFirestore
            .collection('ProjectDetails')
            .doc('ByUser')
            .collection('Users')
            .doc(this.user.uid)
            .valueChanges()
            .pipe(map(actions => actions as ProjectDetails));
    }

    public tasksObservable(projectId: string): Observable<Task[]> {
        return this.angularFirestore
            .collection('Projects')
            .doc(projectId)
            .collection('Tasks')
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Task;
                const id = a.payload.doc.id;
                return { id, ...data };
            })));
    }

    public createProject(task: Task, projectsByUser: ProjectDetails) {
        const projectId = this.angularFirestore.createId();
        const taskId = this.angularFirestore.createId();
        this.angularFirestore
            .collection('Projects')
            .doc(projectId)
            .collection('Tasks')
            .doc(taskId)
            .set(task)
            .then(_ => this.linkProjectToUser(projectId, this.user.uid, projectsByUser));
    }

    private linkProjectToUser(projectId: String, userId: string, projectsByUser: ProjectDetails) {
        console.error([projectId].concat(projectsByUser.projectIds));
        this.angularFirestore
            .collection('ProjectDetails')
            .doc('ByUser')
            .collection('Users')
            .doc(userId)
            .update({ projectIds: [projectId].concat(projectsByUser.projectIds) });
    }
}