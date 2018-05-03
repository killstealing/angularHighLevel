import { UserService } from './../../service/user.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../domain/user.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  items: Observable<User[]>;
  formModel: FormGroup;
  filteredOptions: Observable<User[]>;
  constructor(private dialogRef: MatDialogRef<InviteComponent>, @Inject(MAT_DIALOG_DATA)
  private data: any, private userService: UserService, private fb: FormBuilder) {
    this.formModel = this.fb.group({
      member: ['']
    });
  }
  ngOnInit() {
    console.log('invite data:', this.data);
    this.items = this.userService.getUsers();
  }

  save() {
    this.dialogRef.close('close invite');
  }

  displayUser(user: User) {
    const result = user ? user.name : '';
    console.log(name);
    return result;
  }
}
