import { Task } from './task.model';

export interface TaskList {
    id?: number;
    title?: string;
    orderNum?: number;
    projectId?: number;
    tasks?: Task[];
}
