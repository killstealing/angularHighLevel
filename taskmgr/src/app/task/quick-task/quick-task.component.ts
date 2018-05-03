import { formatDate, getDate } from './../../utils/date.utils';
import { Task } from './../../domain/task.model';
import { TaskService } from './../../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskList } from './../../domain/task-list.model';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  @Input() taskList: TaskList;
  @Output() tasksEvent = new EventEmitter<Task[]>();
  desc: string;
  test: string;
  formModel: FormGroup;
  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.formModel = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  @HostListener('keyup.enter')
  save(ev: Event) {
    ev.preventDefault();
    if (!this.formModel.valid) {
      return false;
    }
    this.taskService.addDefaultTask(this.formModel.get('title').value, this.taskList.id)
      .subscribe(result => {
        this.tasksEvent.emit(result);
      });
  }

}
