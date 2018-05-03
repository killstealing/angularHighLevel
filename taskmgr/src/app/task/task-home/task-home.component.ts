import { UpdateTaskTitle } from './../../constData/constData.model';
import { AlertComponent } from './../../common/alert/alert.component';
import { ConfirmComponent } from './../../common/confirm/confirm.component';
import { NewTaskListComponent } from './../new-task-list/new-task-list.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { NewTaskComponent } from './../new-task/new-task.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TaskService } from './../../service/task.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { TaskList } from '../../domain/task-list.model';
import { NewTaskListTitle } from '../../constData/constData.model';
import { Task } from '../../domain/task.model';
import { slideToRight } from '../../animations/route.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {
  taskLists: TaskList[];
  @HostBinding('@routeAnim') state;

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit() {
    this.taskService.getTaskList().subscribe(taskList => this.taskLists = taskList);
  }

  launchNewTaskDialog(event) {
    const taskListId = event.taskListId;
    const dialogRef = this.dialog.open(NewTaskComponent, { data: event });
    dialogRef.afterClosed().subscribe(data => {
      console.log('afterClosed', data);
      if ('' !== data && undefined !== data) {
        this.taskLists.map(taskList => {
          if (taskList.id === taskListId) {
            taskList.tasks = data;
          }
        });
      }

    });
  }

  handleMoveTaskListDialog(taskList: TaskList) {
    const data = this.taskLists.filter(temp => temp.id !== taskList.id);
    const dialogRef = this.dialog.open(CopyTaskComponent, {
      data: {
        'oldTaskList': taskList, 'newTaskList': data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('afterClosed', result);
      if (null != result && '' !== result) {
        this.taskLists = result;
      }
    });
  }

  launchUpdateTaskListDialog(taskList: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: taskList });
    dialogRef.afterClosed().subscribe(result => {
      console.log('afterClosed', result);
      if ('' === result || null === result) {
        return false;
      }
      if (result.result.ifSuccess) {
        this.taskLists.map(temp => {
          if (temp.id === result.id) {
            temp.title = result.title;
          }
        });
      }
      this.dialog.open(AlertComponent, { data: { title: result.result.message } });
    });
  }

  launchDelConfirmDialog(taskListId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, { data: { title: '您确定要删除这个任务列表吗' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.delTaskList(taskListId).subscribe(taskLists => this.taskLists = taskLists);
      }
    });
  }

  newTaskList() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: NewTaskListTitle } });
    dialogRef.afterClosed().subscribe(taskLists => {
      if (null != taskLists && '' !== taskLists) {
        this.taskLists = taskLists;
        console.log(this.taskLists);
      }
    });
    // dialogRef.afterClosed();
  }

  launchUpdateTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: UpdateTaskTitle, task: task } });
  }

  refreshTasks(tasks: Task[]) {
    this.taskLists.map(taskList => {
      if (tasks.length > 0) {
        if (taskList.id === tasks[0].taskListId) {
          taskList.tasks = tasks;
        }
      }
    });
  }

}
