import { QuoteService } from './../service/quote.service';
import { DirectiveModule } from './../directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatIconModule, MatButtonModule
  , MatCardModule, MatInputModule, MatListModule, MatSlideToggleModule, MatGridListModule,
  MatDialogModule, MatAutocompleteModule, MatMenuModule, MatCheckboxModule,
  MatTooltipModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,
  MatSidenavModule, MatSelectModule, MatButtonToggleModule, MatTabsModule,
  MatChipsModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../service/settings.service';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
import { TaskService } from '../service/task.service';
import { ConfirmComponent } from '../common/confirm/confirm.component';
import { AlertComponent } from '../common/alert/alert.component';
import { Page404Component } from '../page404/page404.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent
  ],
  providers: [SettingsService, ProjectService, UserService, TaskService, QuoteService],
  declarations: [ConfirmComponent, AlertComponent, Page404Component, ImageListSelectComponent, AgeInputComponent, ChipsListComponent, IdentityInputComponent, AreaListComponent],
  entryComponents: [ConfirmComponent, AlertComponent]
})
export class SharedModule { }
