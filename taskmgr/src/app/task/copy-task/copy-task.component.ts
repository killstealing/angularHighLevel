import { TaskService } from './../../service/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskList } from '../../domain/task-list.model';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss']
})
export class CopyTaskComponent implements OnInit {
  formModel: FormGroup;
  newTaskList: TaskList[];
  oldTaskList: TaskList;
  constructor(private dialogRef: MatDialogRef<CopyTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private taskService: TaskService) {
    this.formModel = this.fb.group({
      newItem: []
    });
  }

  ngOnInit() {
    this.newTaskList = this.data.newTaskList;
    this.oldTaskList = this.data.oldTaskList;
  }

  save(ev: Event) {
    ev.preventDefault();
    if (!this.formModel.valid) {
      return false;
    }
    const selectedId = this.formModel.get('newItem').value;
    this.taskService.moveTaskList({ 'id1': this.oldTaskList.id, 'id2': selectedId })
      .subscribe(result => this.dialogRef.close(result));
  }

}
