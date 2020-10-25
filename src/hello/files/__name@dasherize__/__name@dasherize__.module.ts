import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgLetModule } from '@ngrx-utils/store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { <%= classify(name)%>ItemComponent } from './<%= dasherize(name)%>-item/<%= dasherize(name)%>-item.component';
import { <%= classify(name)%>FormComponent } from './<%= dasherize(name)%>-form/<%= dasherize(name)%>-form.component';
import { <%= classify(name)%>AddNewComponent } from './<%= dasherize(name)%>-add-new/<%= dasherize(name)%>-add-new.component';
import { <%= classify(name)%>PickerComponent } from './<%= dasherize(name)%>-picker/<%= dasherize(name)%>-picker.component';
import { UnsavedChangesGuard } from '@app/guards/unsavedChanges.guard';
import { reducers } from 'src/app/<%= dasherize(name)%>/store/reducers';
import {
  Read<%= classify(name)%>Effect,
  CreateNew<%= classify(name)%>Effect,
  Delete<%= classify(name)%>Effect,
  Update<%= classify(name)%>Effect,
  CancelToastEffect
} from './store/effects';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name)%>Component,
    canDeactivate: [UnsavedChangesGuard],
  },
];

const components = [
  <%= classify(name)%>Component,
  <%= classify(name)%>ItemComponent,
  <%= classify(name)%>FormComponent,
  <%= classify(name)%>AddNewComponent,
  <%= classify(name)%>PickerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgLetModule,
    StoreModule.forFeature('<%= camelize(name)%>', reducers),
    EffectsModule.forFeature([
      Read<%= classify(name)%>Effect,
      CreateNew<%= classify(name)%>Effect,
      Delete<%= classify(name)%>Effect,
      Update<%= classify(name)%>Effect,
      CancelToastEffect,
    ]),
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [...components],
  exports: [...components]
})
export class <%= classify(name)%>Module {}
