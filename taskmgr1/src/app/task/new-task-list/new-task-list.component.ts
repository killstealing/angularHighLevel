import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {

  title = '';
  listTitle = '';
  form: FormGroup;

  constructor( @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewTaskListComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [this.data.taskList ? this.data.taskList : '', Validators.required]
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    console.log('value', value);
    console.log('valid', valid);
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
