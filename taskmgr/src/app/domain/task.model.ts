import { User } from './user.model';

export interface Task {
    id?: number;
    title: string;
    descT: string;
    completed: number;
    priority: number;
    dueDate: string;
    reminder: string;
    remark?: string;
    createDate: string;
    ownerId?: number;
    ownerEmail?: string;
    taskListId: number;
    user?: User;
}
