import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as from<%= classify(name)%>Actions from '../actions';
import * as fromUIActions from 'src/app/store/UIState.actions';

@Injectable()
export class CancelToastEffect {
  cancelToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.cancel),
      switchMap(({ message }) => of(fromUIActions.toast({ message }))),
    ),
  );
  constructor(private actions$: Actions) {}
}
