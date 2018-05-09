import { DragDropService } from './drag-drop.service';
import { NgModule } from '@angular/core';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';

@NgModule({
  imports: [
  ],
  declarations: [DragDirective, DropDirective],
  exports: [
    DragDirective,
    DropDirective
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
