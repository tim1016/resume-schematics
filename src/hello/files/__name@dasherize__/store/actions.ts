import { createAction, props } from '@ngrx/store';
import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { ActionTypes } from './actionTypes';

declare type T = <%= classify(name)%>;

export const cancel = createAction(ActionTypes.CANCEL);

export const startCreateNew = createAction(ActionTypes.CREATE_START);
export const createNew = createAction(
  ActionTypes.CREATE,
  props<{ payload: T }>(),
);
export const endCreateNew = createAction(ActionTypes.CREATE_START);
export const createNewSuccess = createAction(
  ActionTypes.CREATE_SUCCESS,
  props<{ payload: T }>(),
);
export const createNewFailure = createAction(ActionTypes.CREATE_FAILURE);

export const startRead = createAction(ActionTypes.READ_START);
export const endRead = createAction(ActionTypes.READ_END);
export const readSuccess = createAction(
  ActionTypes.READ_SUCCESS,
  props<{ list: T[] }>(),
);
export const readFailure = createAction(ActionTypes.READ_FAILURE);

export const startUpdate = createAction(
  ActionTypes.UPDATE_START,
  props<{ index: number }>(),
);
export const update = createAction(ActionTypes.UPDATE, props<{ item: T }>());
export const updateSuccess = createAction(
  ActionTypes.UPDATE_SUCCESS,
  props<{ item: T }>(),
);
export const updateFailure = createAction(ActionTypes.UPDATE_FAILURE);

export const startDelete = createAction(ActionTypes.DELETE_START);
export const deleteItem = createAction(
  ActionTypes.DELETE,
  props<{ item: T }>(),
);
export const deleteSuccess = createAction(
  ActionTypes.DELETE_SUCCESS,
  props<{ item: T }>(),
);
export const deleteFailure = createAction(ActionTypes.DELETE_FAILURE);
