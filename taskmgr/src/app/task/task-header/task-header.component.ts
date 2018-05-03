import { ConfirmComponent } from './../../common/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from './../new-task/new-task.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService } from './../../service/settings.service';
import { TaskList } from './../../domain/task-list.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() taskList: TaskList;
  @Output() newTaskEvent = new EventEmitter();
  @Output() moveThisTaskListEvent = new EventEmitter();
  @Output() updateTaskListEvent = new EventEmitter();
  @Output() deleteTaskListEvent = new EventEmitter();
  // constructor(private setingService: SettingsService,
  //   private oc: OverlayContainer) { }
  constructor(private dialog: MatDialog) { }
  ngOnInit() {
    // if (this.setingService.ifSwitchTheme) {
    //   this.oc.getContainerElement().classList.add(this.setingService.theme);
    // } else {
    //   this.oc.getContainerElement().classList.remove(this.setingService.theme);
    // }
  }

  newTask() {
    // const dialogRef = this.dialog.open(NewTaskComponent, { data: { 'title': '新建任务' } });
    // dialogRef.afterClosed().subscribe(item => console.log(item));
    this.newTaskEvent.emit({ 'title': '新建任务', 'taskListId': this.taskList.id });
  }

  moveThisTaskList() {
    this.moveThisTaskListEvent.emit(this.taskList);
  }

  updateTaskList() {
    this.updateTaskListEvent.emit({ 'title': '修改任务列表', 'taskList': this.taskList });
  }

  deleteTaskList() {
    // this.dialog.open(ConfirmComponent, { data: { title: '您确定要删除这个任务列表吗' } });
    this.deleteTaskListEvent.emit(this.taskList.id);
  }

}
