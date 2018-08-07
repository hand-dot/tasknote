import { Task } from './interfaces';
import { Weekday, Status, Schedule as ScheduleEnum } from './constants';

export interface Profile {
    id?: string;
    uid: string;
    providerId?: string;
    familyName?: string;
    givenName?: string;
    email?: string;
    phoneNumber?: string;
    displayName?: string;
    statusMessage?: string;
    photoURL?: string;
    locale?: string;
}
export interface User {
    profile: Profile
    projectIds?: Array<String>
    isNewUser?: boolean;
}

export interface Project {
    userIds: Array<String>;
    createdAt?: Date;
}

export interface Task {
    userId: string;
    title: string;
    content: string;
    tag: string;
    place: string;
    status: Status;
    schedule: Schedule;
    comments?: Array<Comment>;
    createdAt: Date;
}

export interface Schedule {
    date: Date
    weekday: Weekday
    interval: number
}

export interface Comment {
    userId: string;
    comment: string;
    createdAt: Date;
}


