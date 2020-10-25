import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { getNewSeqNo } from '../utilities/functions';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';
import { Focus } from '../focus/focus.model';
import { SharedFeaturesService } from '../services/shared-features.service';
import * as from<%= classify(name)%>Actions from './store/actions';
import * as fromUISelectors from 'src/app/store/selectors';
import { enterToDisplay, listState } from 'src/app/shared/animations';
import { Logger } from '@app/core';
import { CanComponentDeactivate } from '@app/guards/unsavedChanges.guard';

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
  uiStateCSS: any;
  modifications: boolean;

  constructor(public service: <%= classify(name)%>Service, private sharedService: SharedFeaturesService, private store: Store) {}

  ngOnInit() {
    this.initialize();
    this.store.pipe(select(fromUISelectors.modifications)).subscribe(mods => {
      this.modifications = mods;
    });
  }

  initialize() {
    if (!this.service.collectionPath) {
      this.service.setCollectionPath();
    }
    this.service.initValues();
  }

  startAddingNew() {
    this.store.dispatch(from<%= classify(name)%>Actions.startCreateNew());
  }

  doReorder(event: any, list: T[]) {
    const { from, to } = event.detail;
    const newSeqNo = getNewSeqNo<T>(from, to, list.slice());
    let newItem = list[from];
    newItem = { ...newItem, seqNo: newSeqNo };
    this.store.dispatch(from<%= classify(name)%>Actions.update({ item: newItem }));
    event.detail.complete();
    this.store.dispatch(from<%= classify(name)%>Actions.startRead());
  }

  includesFilter(item: T) {
    return this.sharedService.includesFilter<T>(item, this.filterFocusList);
  }

  applyFocusFilter($event: any) {
    this.filterFocusList = $event;
  }

  async canDeactivate() {
    log.debug(this.modifications);
    if (!this.modifications) {
      return true;
    } else {
      const confirm = await this.sharedService.presentAlertConfirm('Unsaved Changes', 'You will lose all changes');
      this.store.dispatch(from<%= classify(name)%>Actions.cancel({ message: 'The changes have been discarded' }));
      return confirm;
    }
  }

  ngOnDestroy() {}
}
