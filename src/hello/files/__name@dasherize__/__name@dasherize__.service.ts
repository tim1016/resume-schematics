import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { Noun, UIState } from '../utilities/types';

import { select, Store } from '@ngrx/store';
import { ReadFirestoreDataService } from 'src/app/afmodule/read-firestore-data.service';
import { setCollectionPath } from 'src/app/utilities/functions/';

import * as fromAuthSelectors from 'src/app/auth/store/selectors';
import * as fromUISelectors from 'src/app/store/selectors';
import * as from<%= classify(name)%>Selectors from './store/selectors';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(name)%>Service {
  pageTitle: Noun = {
    singular: 'ITEMNAME',
    plural: 'ITEMNAMES',
  };
  collectionPath: string | null = null;

  <%= dasherize(name)%>List$: Observable<<%= classify(name)%>[]>;
  editIndex$: Observable<number>;
  editItem$: Observable<<%= classify(name)%>>;
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
    this.editIndex$ = this.store.pipe(select(from<%= classify(name)%>Selectors.editIndex));
    this.editItem$ = this.store.pipe(select(from<%= classify(name)%>Selectors.editItem));
    this.operationFailed$ = this.store.pipe(
      select(from<%= classify(name)%>Selectors.operationFailed)
    );
    this.modifications$ = this.store.pipe(
      select(fromUISelectors.modifications),
    );
    this.uiState$ = this.store.pipe(select(fromUISelectors.uiState));
  }

  get list$() {
    return this.store.pipe(select(fromAuthSelectors.currentUser)).pipe(
      switchMap(currentUser => {
        if (this.collectionPath === null) {
          this.collectionPath = setCollectionPath(
            this.pageTitle.singular,
            currentUser.uid,
          );
        }
        return this.readFirestoreDataService.getListWithFocus<Summary>(
          this.collectionPath,
        );
      }),
    );
  }
}
