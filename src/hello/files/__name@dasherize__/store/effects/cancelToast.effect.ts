import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';

import * as from<%= classify(name)%>Actions from '../actions';
import * as fromUIActions from 'src/app/store/UIState.actions';

@Injectable()
export class CancelToastEffect {
  cancelToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(from<%= classify(name)%>Actions.cancel),
      mapTo(
        fromUIActions.toast({
          message: 'Action cancelled',
        }),
      ),
    ),
  );
  constructor(private actions$: Actions) {}
}
