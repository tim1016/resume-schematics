import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mapTo, withLatestFrom } from 'rxjs/operators';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as from<%= classify(name)%>Actions from '../actions';
import * as fromUIActions from 'src/app/store/UIState.actions';
import { <%= classify(name)%>Service } from '../../<%= dasherize(name)%>.service';
import * as fromAuthSelectors from 'src/app/auth/store/selectors';

@Injectable()
export class Read<%= classify(name)%>Effect {
  read<%= classify(name)%>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.startRead),
      withLatestFrom(this.store.pipe(select(fromAuthSelectors.currentUser))),
      switchMap(([_, user]) => {
        if (user && user.uid) {
          return this.service.list$.pipe(
            map(list => from<%= classify(name)%>Actions.readSuccess({ list })),
            catchError(e => {
              console.log(e);
              return of(from<%= classify(name)%>Actions.readFailure());
            }),
          );
        } else {
          return of(from<%= classify(name)%>Actions.readFailure());
        }
      }),
    ),
  );

  $endReading = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.readSuccess, from<%= classify(name)%>Actions.readFailure),
      mapTo(from<%= classify(name)%>Actions.endRead()),
    ),
  );

  updateUIonStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.startRead),
      mapTo(
        fromUIActions.setUItoReading({
          activeItem: this.service.pageTitle.singular,
        }),
      ),
    ),
  );

  updateUIonEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.endRead),
      mapTo(
        fromUIActions.setUItoDefault({
          activeItem: '',
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private service: <%= classify(name)%>Service,
    private store: Store,
  ) {}
}
