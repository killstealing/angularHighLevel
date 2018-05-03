import { ConstClass } from './../../constData/constData.model';
import { ProjectService } from './../../service/project.service';
import { SettingsService } from './../../service/settings.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from '../../domain/project.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  formModel: FormGroup;
  dialogTitle: string;
  isEdit: boolean;
  constructor(public dialogRef: MatDialogRef<NewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private settings: SettingsService,
    private oc: OverlayContainer, private fb: FormBuilder,
    private projectService: ProjectService) { }

  ngOnInit() {

    this.dialogTitle = this.data.title;
    this.isEdit = this.data.title === ConstClass.EditProjectTitle;
    console.log(this.data.project);
    if (this.isEdit) {
      this.formModel = this.fb.group({
        title: [this.data.project.title],
        descT: [this.data.project.descT]
      });
    } else {
      this.formModel = this.fb.group({
        title: [''],
        descT: ['']
      });
    }
  }

  save(ev: Event) {
    ev.preventDefault();
    if (!this.formModel.valid) {
      return false;
    }
    if (!this.isEdit) {
      this.projectService.doInsert(this.formModel.value).subscribe(list => {
        this.dialogRef.close(list);
      });
    } else {
      const project: Project = this.formModel.value;
      project.id = this.data.project.id;
      this.projectService.doUpdate(project)
        .subscribe(list => this.dialogRef.close(list));
    }
  }

}
