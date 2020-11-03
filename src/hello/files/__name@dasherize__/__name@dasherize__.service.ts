import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { Noun, UIState } from '../utilities/types';
import { CredentialsService } from '@app/auth/credentials.service';

import * as fromUISelectors from 'src/app/store/selectors';
import * as fromUIActions from '@app/store/UIState.actions';
import { <%= classify(name)%>EntityService } from '@app/<%= dasherize(name)%>/store/<%= dasherize(name)%>-entity.service';

import { Logger } from '@app/core';
const log = new Logger('<%= classify(name)%>Service');

@Injectable()
export class <%= classify(name)%>Service {
  pageTitle: Noun = {
    singular: '<%= classify(name)%>',
    plural: 'Summaries',
  };
  collectionPath: string | null = null;

  itemList$: Observable<<%= classify(name)%>[]>;
  editIndex$: Observable<number>;
  modifications$: Observable<boolean>;
  operationFailed$: Observable<boolean>;
  uiState$: Observable<UIState>;

  constructor(
    private store: Store,
    private credentials: CredentialsService,
    private <%= camelize(name)%>EntityService: <%= classify(name)%>EntityService,
  ) {}

  initValues() {
    this.setCollectionPath();
    this.setActive();
    this.itemList$ = this.<%= camelize(name)%>EntityService.entities$;
    this.editIndex$ = this.store.pipe(select(fromUISelectors.editIndex));
    this.modifications$ = this.store.pipe(select(fromUISelectors.modifications));
    this.uiState$ = this.store.pipe(select(fromUISelectors.uiState));
  }

  setCollectionPath() {
    this.collectionPath = this.credentials.collectionPath('<%= dasherize(name)%>');
  }

  delete(id: string): void {
    this.<%= camelize(name)%>EntityService.delete(id);
  }

  update(item: <%= classify(name)%>, id: string) {
    this.<%= camelize(name)%>EntityService.update({ ...item, id });
  }

  add(item: <%= classify(name)%>) {
    this.<%= camelize(name)%>EntityService.add(item);
  }

  setActive() {
    this.store.dispatch(fromUIActions.setActiveItem({ activeItem: this.pageTitle.singular }));
  }

  setUItoUpdating(index: number) {
    this.store.dispatch(fromUIActions.setUItoUpdating({ index }));
  }

  cancel() {
    this.store.dispatch(fromUIActions.cancel());
  }

  setUItoDeleting() {
    this.store.dispatch(fromUIActions.setUItoDeleting());
  }

  setUItoAdding() {
    this.store.dispatch(fromUIActions.setUItoAdding());
  }
}
