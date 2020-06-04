import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { <%= classify(name)%>Page } from './<%= dasherize(name)%>.page';
import { <%= classify(name)%>ItemComponent } from './<%= dasherize(name)%>-item/<%= dasherize(name)%>-item.component';
import { <%= classify(name)%>FormComponent } from './<%= dasherize(name)%>-form/<%= dasherize(name)%>-form.component';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name)%>Page,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes),  SharedModule],
  declarations: [<%= classify(name)%>Page, <%= classify(name)%>ItemComponent, <%= classify(name)%>FormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class <%= classify(name)%>PageModule {}
