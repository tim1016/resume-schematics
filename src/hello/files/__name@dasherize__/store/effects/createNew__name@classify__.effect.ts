import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';

import * as from<%= classify(name)%>Actions from '../actions';
import * as fromUIActions from 'src/app/store/UIState.actions';
import { <%= classify(name)%>Service } from '../../<%= dasherize(name)%>.service';
import { FirestoreUtilitiesService } from 'src/app/afmodule/firestore-utilities.service';

@Injectable()
export class CreateNew<%= classify(name)%>Effect {
  save<%= classify(name)%>OnBackend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.createNew),
      switchMap(action => {
        console.log('collectionPath: ', this.service.collectionPath);
        return this.firestoreUtilities
          .add(this.service.collectionPath, action.payload)
          .pipe(
            map(docRef => from<%= classify(name)%>Actions.createNewSuccess(action)),
            catchError(e => {
              console.log(e);
              return of(from<%= classify(name)%>Actions.createNewFailure);
            }),
          );
      }),
    ),
  );

  updateUIonStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.startCreateNew),
      mapTo(
        fromUIActions.setUItoAdding({
          activeItem: this.service.pageTitle.singular,
        }),
      ),
    ),
  );

  updateUIonEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        from<%= classify(name)%>Actions.createNewSuccess,
        from<%= classify(name)%>Actions.createNewFailure,
        from<%= classify(name)%>Actions.cancel,
      ),
      mapTo(
        fromUIActions.setUItoDefault({
          activeItem: null,
        }),
      ),
    ),
  );

  toastSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.createNewSuccess),
      mapTo(
        fromUIActions.toast({
          message: 'Successfully created',
        }),
      ),
    ),
  );

  toastFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.createNewFailure),
      mapTo(
        fromUIActions.toast({
          message: 'Item addition failed',
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
