import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';

import * as from<%= classify(name)%>Actions from '../actions';
import * as fromUIActions from 'src/app/store/UIState.actions';
import { <%= classify(name)%>Service } from '../../<%= dasherize(name)%>.service';
import { <%= classify(name)%> } from '../../<%= dasherize(name)%>.model';
import { FirestoreUtilitiesService } from 'src/app/afmodule/firestore-utilities.service';
import { Logger } from '@app/core';

const log = new Logger('Update<%= classify(name)%>Effect');

@Injectable()
export class Update<%= classify(name)%>Effect {
  update<%= classify(name)%>OnBackend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.update),
      switchMap(action => {
        log.debug('item from effect: ', action.item);
        return this.firestoreUtilities.update<<%= classify(name)%>>(this.service.collectionPath, action.item).pipe(
          map(() => from<%= classify(name)%>Actions.updateSuccess(action)),
          catchError(e => {
            log.debug(e);
            return of(from<%= classify(name)%>Actions.updateFailure);
          }),
        );
      }),
    ),
  );

  updateUIonStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.startUpdate),
      mapTo(
        fromUIActions.setUItoUpdating({
          activeItem: this.service.pageTitle.singular,
        }),
      ),
    ),
  );

  updateUIonEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.update, from<%= classify(name)%>Actions.cancel),
      mapTo(
        fromUIActions.setUItoDefault({
          activeItem: '',
        }),
      ),
    ),
  );

  toastSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.updateSuccess),
      mapTo(
        fromUIActions.toast({
          message: 'Successfully updated',
        }),
      ),
    ),
  );

  toastFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.updateFailure),
      mapTo(
        fromUIActions.toast({
          message: 'Update failed',
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
