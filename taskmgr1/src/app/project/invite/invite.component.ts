import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { User } from '../../domain/index';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: User[] = [];
  constructor( @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }

  onSubmit(ev: Event, { valid, value }) {
    ev.preventDefault();
    if (!valid) {

    }
  }
}
