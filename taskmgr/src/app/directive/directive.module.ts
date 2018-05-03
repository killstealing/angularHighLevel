import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective]
})
export class DirectiveModule { }
