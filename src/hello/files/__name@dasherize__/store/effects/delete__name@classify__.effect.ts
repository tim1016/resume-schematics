import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';

import * as from<%= classify(name)%>Actions from '../actions';
import * as fromUIActions from 'src/app/store/UIState.actions';
import { <%= classify(name)%>Service } from '../../<%= dasherize(name)%>.service';
import { FirestoreUtilitiesService } from 'src/app/afmodule/firestore-utilities.service';
import { Logger } from '@app/core';

const log = new Logger('Delete<%= classify(name)%>Effect');

@Injectable()
export class Delete<%= classify(name)%>Effect {
  delete<%= classify(name)%>OnBackend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.deleteItem),
      switchMap(action => {
        return this.firestoreUtilities.delete(this.service.collectionPath, action.item).pipe(
          map(() => from<%= classify(name)%>Actions.deleteSuccess(action)),
          catchError(e => {
            log.debug(e);
            return of(from<%= classify(name)%>Actions.deleteFailure);
          }),
        );
      }),
    ),
  );

  updateUIonStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.startDelete),
      mapTo(
        fromUIActions.setUItoDeleting({
          activeItem: this.service.pageTitle.singular,
        }),
      ),
    ),
  );

  updateUIonEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.deleteSuccess, from<%= classify(name)%>Actions.deleteFailure),
      mapTo(
        fromUIActions.setUItoDefault({
          activeItem: '',
        }),
      ),
    ),
  );

  toastSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.deleteSuccess),
      mapTo(
        fromUIActions.toast({
          message: 'Successfully deleted',
        }),
      ),
    ),
  );

  toastFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.deleteFailure),
      mapTo(
        fromUIActions.toast({
          message: 'Item deletion failed',
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private service: <%= classify(name)%>Service,
    private firestoreUtilities: FirestoreUtilitiesService,
  ) {}
}
