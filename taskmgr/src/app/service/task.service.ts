import { MoveTaskList } from './../domain/move-task-list.model';
import { ResultModel } from './../domain/result.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskList } from '../domain/task-list.model';
import { Task } from '../domain/task.model';
import { getDate } from '../utils/date.utils';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  getTaskList() {
    return this.http.get('/api/taskListsAll') as Observable<TaskList[]>;
  }

  getTasksByTaskListId(id: number) {
    return this.http.get(`/api/tasks/${id}`) as Observable<Task[]>;
  }

  addTask(task: Task) {
    task.completed = -1;
    return this.http.post(`/api/task`, task) as Observable<Task[]>;
  }

  addDefaultTask(title: string, taskListId: number) {

    const task: Task = {
      title: title,
      descT: title,
      completed: -1,
      priority: 1,
      dueDate: getDate(),
      reminder: getDate(),
      createDate: getDate(),
      ownerEmail: 'zhangsan@gmail.com',
      taskListId: taskListId
    };

    task.completed = -1;
    return this.http.post(`/api/task`, task) as Observable<Task[]>;
  }

  updateTaskList(taskList: TaskList) {
    return this.http.post(`/api/taskList`, taskList) as Observable<ResultModel>;
  }

  moveTaskList(moveTaskList: MoveTaskList) {
    return this.http.put(`/api/taskList`, moveTaskList) as Observable<TaskList[]>;
  }

  delTaskList(id: number) {
    return this.http.delete(`/api/taskList/${id}`) as Observable<TaskList[]>;
  }

  addTaskList(taskList: TaskList) {
    return this.http.post(`/api/taskListA`, taskList) as Observable<TaskList[]>;
  }
}
