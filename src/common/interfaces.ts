import { Task } from './interfaces';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { Weekday, Status, Schedule as ScheduleEnum } from './constants';

export interface User {
    displayName?: string;
    email?: string;
    phoneNumber?: string;
    photoURL?: string;
    providerId?: string;
    uid?: string;
    statusMessage?: string;
}

export interface Friends {

}

export interface Task {
    taskId: string;
    uid: string;
    title: string;
    content: string;
    place: string;
    status: Status;
    schedule: Schedule;
    likes?: Array<Like>;
    comments?: Array<Comment>;
    createdAt: Date;
}

export interface Schedule {
    date: Date
    weekday: Weekday
    interval: number
}

export interface Like {
    uid: string;
    likeId: string;
}

export interface Comment {
    uid: string;
    commentId: string;
    comment: string;
}


