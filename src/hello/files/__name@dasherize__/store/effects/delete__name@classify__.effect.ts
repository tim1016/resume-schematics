import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as from<%= classify(name)%>Actions from '../actions';
import { <%= classify(name)%>Service } from '../../<%= dasherize(name)%>.service';
import { FirestoreUtilitiesService } from 'src/app/afmodule/firestore-utilities.service';

@Injectable()
export class Delete<%= classify(name)%>Effect {
  delete<%= classify(name)%>OnBackend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.deleteItem),
      switchMap(action => {
        return this.firestoreUtilities
          .delete(this.service.collectionPath, action.item)
          .pipe(
            map(() => from<%= classify(name)%>Actions.deleteSuccess(action)),
            catchError(e => {
              console.log(e);
              return of(from<%= classify(name)%>Actions.deleteFailure);
            }),
          );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private service: <%= classify(name)%>Service,
    private firestoreUtilities: FirestoreUtilitiesService,
  ) {}
}
