import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgLetModule } from '@ngrx-utils/store';

import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { <%= classify(name)%>EntityService } from '@app/<%= dasherize(name)%>/store/<%= dasherize(name)%>-entity.service';
import { <%= classify(name)%>Resolver } from './<%= dasherize(name)%>.resolver';
import { <%= classify(name)%>DataService } from '@app/<%= dasherize(name)%>/store/<%= dasherize(name)%>-data.service';
import { entityMetadata } from '@app/<%= dasherize(name)%>/store/entityMetadata';
import { <%= classify(name)%>Service } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.service';

import { SharedModule } from '../shared/shared.module';
import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { <%= classify(name)%>ItemComponent } from './<%= dasherize(name)%>-item/<%= dasherize(name)%>-item.component';
import { <%= classify(name)%>FormComponent } from './<%= dasherize(name)%>-form/<%= dasherize(name)%>-form.component';
import { <%= classify(name)%>AddNewComponent } from './<%= dasherize(name)%>-add-new/<%= dasherize(name)%>-add-new.component';
// import { <%= classify(name)%>PickerComponent } from './<%= dasherize(name)%>-picker/<%= dasherize(name)%>-picker.component';
import { UnsavedChangesGuard } from '@app/guards/unsavedChanges.guard';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name)%>Component,
    canDeactivate: [UnsavedChangesGuard],
    resolve: {
      summaries: <%= classify(name)%>Resolver,
    },
  },
];

const components = [
  <%= classify(name)%>Component,
  <%= classify(name)%>ItemComponent,
  <%= classify(name)%>FormComponent,
  <%= classify(name)%>AddNewComponent,
  // <%= classify(name)%>PickerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgLetModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [...components],
  exports: [...components],
  providers: [<%= classify(name)%>Service, <%= classify(name)%>Resolver, <%= classify(name)%>EntityService, <%= classify(name)%>DataService],
})
export class <%= classify(name)%>Module {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private <%= camelize(name)%>DataService: <%= classify(name)%>DataService,
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('<%= classify(name)%>', <%= dasherize(name)%>DataService);
  }
}
