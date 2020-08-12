import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { <%= classify(name)%>ItemComponent } from './<%= dasherize(name)%>-item/<%= dasherize(name)%>-item.component';
import { <%= classify(name)%>FormComponent } from './<%= dasherize(name)%>-form/<%= dasherize(name)%>-form.component';
import { <%= classify(name)%>AddNewComponent } from './<%= dasherize(name)%>-add-new/<%= dasherize(name)%>-add-new.component';
import { FocusModule } from '../focus/focus.module';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name)%>Component,
  },
];

const components = [
  <%= classify(name)%>Component,
  <%= classify(name)%>ItemComponent,
  <%= classify(name)%>FormComponent,
  <%= classify(name)%>AddNewComponent,
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    FocusModule,
  ],
  declarations: [...components],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class <%= classify(name)%>Module {}
