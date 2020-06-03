import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { SummaryPageRoutingModule } from './summary-routing.module';
import { SummaryPage } from './summary.page';
import { SummaryItemComponent } from './summary-item/summary-item.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SummaryPageRoutingModule, SharedModule],
  declarations: [SummaryPage, SummaryItemComponent, SummaryFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SummaryPageModule {}
