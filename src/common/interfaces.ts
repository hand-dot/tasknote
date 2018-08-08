import { Task } from './interfaces';
import { Weekday, Status, Schedule as ScheduleEnum } from './constants';
import firebase from '../../node_modules/firebase';

export interface Base {
    updatedAt?: firebase.firestore.FieldValue,
    createdAt?: firebase.firestore.FieldValue,
}

export interface Profile {
    id?: string,
    uid: string,
    providerId?: string,
    familyName?: string,
    givenName?: string,
    email?: string,
    phoneNumber?: string,
    displayName?: string,
    statusMessage?: string,
    photoURL?: string,
    locale?: string,
}
export interface User {
    profile: Profile,
    projectIds?: {},
    isNewUser?: boolean,
}

export interface Project extends Base {
    projectName: string;
    userIds: {},
}

export interface Task extends Base {
    userId: string,
    title: string,
    content: string,
    tag: string,
    place: string,
    status: Status,
    schedule: Schedule,
    comments?: Comment[],
}

export interface Schedule {
    date: Date,
    weekday: Weekday,
    interval: number,
}

export interface Comment {
    userId: string,
    comment: string,
    createdAt: Date,
}


