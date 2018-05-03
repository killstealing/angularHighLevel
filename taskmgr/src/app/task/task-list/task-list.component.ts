import { TaskList } from './../../domain/task-list.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() taskList: TaskList;
  constructor() { }

  ngOnInit() {
  }

}
