import { UpdateTaskTitle } from './../../constData/constData.model';
import { formatDate } from './../../utils/date.utils';
import { TaskService } from './../../service/task.service';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './../../service/user.service';
import { User } from './../../domain/user.model';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from '../../domain/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  title: string;
  taskListId: number;
  formModel: FormGroup;
  items: User[];
  isAdd: boolean;
  constructor(private dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private userService: UserService, private taskService: TaskService) {
  }

  filterUser(name: string) {
    return this.userService.getUsersByName(name);
  }

  ngOnInit() {
    this.title = this.data.title;
    this.taskListId = this.data.taskListId;
    this.isAdd = this.data.title !== UpdateTaskTitle;
    if (!this.isAdd) {
      this.formModel = this.fb.group({
        title: [this.data.task.title],
        priority: [this.data.task.priority],
        dueDate: [this.data.task.dueDate],
        reminder: [this.data.task.reminder],
        ownerEmail: [this.data.task.user.email]
      });
    } else {
      this.formModel = this.fb.group({
        title: [''],
        priority: ['1'],
        dueDate: [''],
        reminder: [''],
        ownerEmail: ['']
      });
    }
    this.formModel.get('ownerEmail').valueChanges.pipe(
      distinctUntilChanged(),
      // debounceTime(500)
      // startWith(''),
      // debounceTime(500),
    ).subscribe(
      name => name ? this.filterUser(name).subscribe(
        result => this.items = result
      ) : this.userService.getUsers().subscribe(
        result => this.items = result
      )
    );
  }
  save(event: Event) {
    event.preventDefault();
    if (!this.formModel.valid) {
      return false;
    }
    const task: Task = this.formModel.value;
    if (this.isAdd) {
      task.completed = -1;
      task.taskListId = this.taskListId;
      task.dueDate = formatDate(this.formModel.get('dueDate').value);
      task.reminder = formatDate(this.formModel.get('reminder').value);
      this.taskService.addTask(task).subscribe(result =>
        this.dialogRef.close(result)
      );
    } else {
      task.completed = -1;
      task.taskListId = this.taskListId;
      task.dueDate = formatDate(this.formModel.get('dueDate').value);
      task.reminder = formatDate(this.formModel.get('reminder').value);
      this.taskService.addTask(task).subscribe(result =>
        this.dialogRef.close(result)
      );
    }

  }
}
