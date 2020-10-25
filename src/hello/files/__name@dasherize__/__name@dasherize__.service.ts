import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { Noun, UIState } from '../utilities/types';
import { Logger } from '@app/core';
import { ReadFirestoreDataService } from 'src/app/afmodule/read-firestore-data.service';
import { CredentialsService } from '@app/auth/credentials.service';

import * as fromUISelectors from 'src/app/store/selectors';
import * as from<%= classify(name)%>Selectors from './store/selectors';
import * as from<%= classify(name)%>Actions from './store/actions';

const log = new Logger('<%= classify(name)%>Service');

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
    private credentials: CredentialsService,
    private readFirestoreDataService: ReadFirestoreDataService,
  ) {}
  
  initValues() {
    this.<%= camelize(name)%>List$ = this.store.pipe(select(from<%= classify(name)%>Selectors.<%= camelize(name)%>List)).pipe(
      tap(list => {
        log.debug(list);
        if (list === null || list.length === 0) {
          this.store.dispatch(from<%= classify(name)%>Actions.startRead());
        }
      }),
    );
    this.editIndex$ = this.store.pipe(select(from<%= classify(name)%>Selectors.editIndex));
    this.editItem$ = this.store.pipe(select(from<%= classify(name)%>Selectors.editItem));
    this.operationFailed$ = this.store.pipe(select(from<%= classify(name)%>Selectors.operationFailed));
    this.modifications$ = this.store.pipe(select(fromUISelectors.modifications));
    this.uiState$ = this.store.pipe(select(fromUISelectors.uiState));
  }

  get list$() {
    return this.readFirestoreDataService.getListWithFocus<<%= classify(name)%>>(this.collectionPath);
  }

  setCollectionPath() {
    this.collectionPath = this.credentials.collectionPath(this.pageTitle.singular.toLowerCase());
  }
}
