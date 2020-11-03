import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { getNewSeqNo } from '../utilities/functions';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';
import { Focus } from '../focus/focus.model';
import { SharedFeaturesService } from '../services/shared-features.service';
import { enterToDisplay, listState } from 'src/app/shared/animations';
import { CanComponentDeactivate } from '@app/guards/unsavedChanges.guard';
import { ComponentControllerService } from '@app/services/componentController.service';

import { Logger } from '@app/core';
const log = new Logger('<%= classify(name)%>Component');

declare type T = <%= classify(name)%>;
@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: './<%= dasherize(name)%>.component.html',
  styleUrls: ['./<%= dasherize(name)%>.component.scss'],
  animations: [enterToDisplay, listState],
})
export class <%= classify(name)%>Component implements OnInit, OnDestroy, CanComponentDeactivate {
  filterFocusList: Focus[] = [];
  filteredFocus = '';
  modifications: boolean;

  constructor(
    public service: <%= classify(name)%>Service,
    private sharedService: SharedFeaturesService,
    private controllerService: ComponentControllerService,
  ) {}

  ngOnInit() {
    this.service.initValues();
  }

  startAddingNew() {
    this.service.setUItoAdding();
  }

  doReorder(event: any, list: T[]) {
    const { from, to } = event.detail;
    this.service.setUItoUpdating(from);
    const newSeqNo = getNewSeqNo<T>(from, to, list.slice());
    let newItem = list[from];
    newItem = { ...newItem, seqNo: newSeqNo };
    this.service.update(newItem, newItem.id);
    event.detail.complete();
  }

  includesFilter(item: T) {
    return this.sharedService.includesFilter<T>(item, this.filterFocusList);
  }

  applyFocusFilter($event: any) {
    this.filterFocusList = $event;
  }

  async canDeactivate() {
    if (!this.modifications) {
      return true;
    }
    const confirm = await this.controllerService.presentAlertConfirm('Unsaved Changes', 'You will lose all changes');
    return confirm;
  }

  ngOnDestroy() {}
}
