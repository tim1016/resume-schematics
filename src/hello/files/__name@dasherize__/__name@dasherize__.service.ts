import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { Noun, UIState } from '../utilities/types';

import { select, Store } from '@ngrx/store';
import * as from<%= classify(name)%>Selectors from './store/selectors';
import { ReadFirestoreDataService } from 'src/app/afmodule/read-firestore-data.service';
import * as fromAuthSelectors from '../auth/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(name)%>Service {
  pageTitle: Noun = {
    singular: 'ITEMNAME',
    plural: 'ITEMNAMES',
  };
  collectionPath: string | null;

  <%= dasherize(name)%>List$: Observable<<%= classify(name)%>[]>;
  addingNew$: Observable<boolean>;
  editIndex$: Observable<number>;
  editItem$: Observable<<%= classify(name)%>>;
  isLoading$: Observable<boolean>;
  modifications$: Observable<boolean>;
  operationFailed$: Observable<boolean>;
  uiState$: Observable<UIState>;

  constructor(
    private store: Store,
    private readFirestoreDataService: ReadFirestoreDataService
  ) {
    this.initValues();
  }

  initValues() {
    this.<%= dasherize(name)%>List$ = this.store.pipe(
      select(from<%= classify(name)%>Selectors.<%= dasherize(name)%>List)
    );
    this.addingNew$ = this.store.pipe(select(from<%= classify(name)%>Selectors.addingNew));
    this.editIndex$ = this.store.pipe(select(from<%= classify(name)%>Selectors.editIndex));
    this.editItem$ = this.store.pipe(select(from<%= classify(name)%>Selectors.editItem));
    this.isLoading$ = this.store.pipe(select(from<%= classify(name)%>Selectors.isReading));
    this.modifications$ = this.store.pipe(
      select(from<%= classify(name)%>Selectors.modifications)
    );
    this.operationFailed$ = this.store.pipe(
      select(from<%= classify(name)%>Selectors.operationFailed)
    );
    this.uiState$ = this.store.pipe(select(from<%= classify(name)%>Selectors.uiState));
  }

  setCollection(uid: string) {
    const userString = '/users/' + uid;
    const remainder =
      '/userData/itemsList/' + this.pageTitle.singular.toLowerCase() + 'List';
    this.collectionPath = userString + remainder;
  }

  get list$() {
    return this.store.pipe(select(fromAuthSelectors.currentUser)).pipe(
      switchMap((currentUser) => {
        return this.readFirestoreDataService.getListWithFocus<<%= classify(name)%>>(
          this.collectionPath
        );
      })
    );
  }
}
