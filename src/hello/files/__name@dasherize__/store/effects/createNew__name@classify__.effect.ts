import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { switchMap, map, catchError } from 'rxjs/operators';
import * as from<%= classify(name)%>Actions from '../actions';
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

  constructor(
    private actions$: Actions,
    private service: <%= classify(name)%>Service,
    private firestoreUtilities: FirestoreUtilitiesService,
  ) {}
}
