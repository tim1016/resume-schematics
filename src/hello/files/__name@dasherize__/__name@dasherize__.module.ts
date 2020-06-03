import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { <%= classify(name)%>PageRoutingModule } from './<%= dasherize(name)%>-routing.module';
import { <%= classify(name)%>Page } from './summary.page';
import { <%= classify(name)%>ItemComponent } from './<%= dasherize(name)%>-item/<%= dasherize(name)%>-item.component';
import { <%= classify(name)%>FormComponent } from './<%= dasherize(name)%>-form/<%= dasherize(name)%>-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, <%= classify(name)%>PageRoutingModule, SharedModule],
  declarations: [<%= classify(name)%>Page, <%= classify(name)%>ItemComponent, <%= classify(name)%>FormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class <%= classify(name)%>PageModule {}
