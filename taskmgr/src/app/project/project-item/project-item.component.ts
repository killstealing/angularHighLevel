import { cardAnim } from './../../animations/card.anim';
import { NewProjectComponent } from './../new-project/new-project.component';
import { InviteComponent } from './../invite/invite.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../domain/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() item: Project;
  @Output() editEvent = new EventEmitter();
  @Output() delProjectEvent = new EventEmitter();
  @HostBinding('@card') cardState = 'out';
  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(card) { this.cardState = 'hover'; }
  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(card: HTMLElement) { this.cardState = 'out'; }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  invite() {
    const dialogRef = this.dialog.open(InviteComponent, { data: 'invite' });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result ', result);
    });
  }

  edit() {
    this.editEvent.emit(this.item);
  }

  delProject() {
    this.delProjectEvent.emit(this.item.id);
  }

}
