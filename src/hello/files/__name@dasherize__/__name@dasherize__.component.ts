import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { getNewSeqNo } from '../utilities/functions';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';
import { Focus } from '../focus/focus.model';
import { SharedFeaturesService } from '../services/shared-features.service';
import * as from<%= classify(name)%>Actions from './store/actions';
import * as fromAuthSelectors from 'src/app/auth/store/selectors';
import { enterToDisplay, listState } from 'src/app/shared/animations';

declare type T = <%= classify(name)%>;
@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: './<%= dasherize(name)%>.component.html',
  styleUrls: ['./<%= dasherize(name)%>.component.scss'],
  animations: [enterToDisplay, listState],
})
export class <%= classify(name)%>Component implements OnInit, OnDestroy {
  filterFocusList: Focus[] = [];
  filteredFocus = '';
  uiStateCSS: any;

  constructor(
    public service: <%= classify(name)%>Service,
    private sharedService: SharedFeaturesService,
    private store: Store,
    ) {}

  ngOnInit() {
    this.store.pipe(select(fromAuthSelectors.currentUser)).subscribe(user => {
      if (user) {
        this.store.dispatch(from<%= classify(name)%>Actions.startRead());
      }
    });
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
  }

  includesFilter(item: T) {
    return this.sharedService.includesFilter<T>(item, this.filterFocusList);
  }

  applyFocusFilter($event) {
    this.filterFocusList = $event;
  }

  ngOnDestroy() {}
}
