import { TaskService } from './../../service/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TaskList } from '../../domain/task-list.model';
import { NewTaskListTitle } from '../../constData/constData.model';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {
  taskList: TaskList;
  dialogTitle: string;
  formModel: FormGroup;
  isAdd: boolean;
  constructor(private dialogRef: MatDialogRef<NewTaskListComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder,
    private taskService: TaskService) {
  }

  ngOnInit() {
    this.isAdd = this.data.title === NewTaskListTitle;
    if (this.isAdd) {
      this.dialogTitle = NewTaskListTitle;
      this.formModel = this.fb.group({
        'title': ['']
      });
    } else {
      this.taskList = this.data.taskList;
      this.dialogTitle = this.data.title;
      this.formModel = this.fb.group({
        'title': [this.data.taskList.title]
      });
    }
  }

  save(ev: Event) {
    ev.preventDefault();
    if (!this.formModel.valid) {
      return false;
    }
    const title = this.formModel.get('title').value;
    if (!this.isAdd) {
      this.taskList.title = title;
      this.taskService.updateTaskList(this.taskList).subscribe(result => {
        this.dialogRef.close({ 'taskList': this.taskList, 'result': result });
      });
    } else {
      this.taskService.addTaskList({ title: title }).subscribe(result => {
        this.dialogRef.close(result);
      });
    }

  }

}
