import { Action, createReducer, on } from '@ngrx/store';
import { ItemStateInterface } from 'src/app/store/types/ItemState.interface';
import { UIState } from 'src/app/utilities/types';

import * as from<%= classify(name)%>Actions from './actions';
import {
  findIndexById,
  removeItem,
  updateObjectInArray,
} from 'src/app/utilities/functions';
import { <%= classify(name)%> } from 'src/app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';

const initialState: ItemStateInterface<<%= classify(name)%>> = {
  itemList: [],
  editIndex: -1,
  editItem: null,
  isAdding: false,
  isDeleting: false,
  isReading: false,
  operationFailed: null,
  uiState: 'display' as UIState,
};
const <%= camelize(name)%>Reducer = createReducer(
  initialState,
  on(
    from<%= classify(name)%>Actions.cancel,
    (state): ItemStateInterface<<%= classify(name)%>> => ({
      ...state,
      editIndex: -1,
      editItem: null,
      isAdding: false,
      isDeleting: false,
      isReading: false,
      operationFailed: null,
      uiState: 'display' as UIState,
    }),
  ),
  on(from<%= classify(name)%>Actions.startCreateNew, state => ({
    ...state,
    isAdding: true,
    uiState: 'creating' as UIState,
  })),
  on(from<%= classify(name)%>Actions.createNewSuccess, state => ({
    ...state,
    isAdding: false,
    operationFailed: false,
    uiState: 'display' as UIState,
  })),
  on(from<%= classify(name)%>Actions.createNewFailure, state => ({
    ...state,
    isAdding: false,
    operationFailed: true,
    uiState: 'display' as UIState,
  })),
  on(
    from<%= classify(name)%>Actions.startRead,
    (state): ItemStateInterface<<%= classify(name)%>> => ({
      ...state,
      isReading: true,
      operationFailed: null,
      uiState: 'reading' as UIState,
    }),
  ),
  on(
    from<%= classify(name)%>Actions.endRead,
    (state): ItemStateInterface<<%= classify(name)%>> => ({
      ...state,
      isReading: false,
      uiState: 'display' as UIState,
    }),
  ),
  on(
    from<%= classify(name)%>Actions.readSuccess,
    (state, action): ItemStateInterface<<%= classify(name)%>> => {
      return {
        ...state,
        itemList: [...action.list],
        operationFailed: false,
        uiState: 'display' as UIState,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.readFailure,
    (state): ItemStateInterface<<%= classify(name)%>> => ({
      ...state,
      operationFailed: true,
      uiState: 'display' as UIState,
    }),
  ),
  on(
    from<%= classify(name)%>Actions.startUpdate,
    (state, action): ItemStateInterface<<%= classify(name)%>> => {
      return {
        ...state,
        editIndex: action.index,
        uiState: 'editing' as UIState,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.update,
    (state, action): ItemStateInterface<<%= classify(name)%>> => {
      const index = findIndexById<<%= classify(name)%>>([...state.itemList], action.item.id);
      return {
        ...state,
        editItem: action.item,
        operationFailed: null,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.startDelete,
    (state): ItemStateInterface<<%= classify(name)%>> => {
      return {
        ...state,
        isDeleting: true,
        uiState: 'deleting' as UIState,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.deleteItem,
    (state, action): ItemStateInterface<<%= classify(name)%>> => {
      const index = findIndexById<<%= classify(name)%>>([...state.itemList], action.item.id);
      return {
        ...state,
        editIndex: index,
        editItem: action.item,
        operationFailed: null,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.updateSuccess,
    (state, action): ItemStateInterface<<%= classify(name)%>> => {
      let updated<%= classify(name)%>List = [...state.itemList];
      const index = findIndexById<<%= classify(name)%>>(updated<%= classify(name)%>List, action.item.id);
      updated<%= classify(name)%>List = updateObjectInArray<<%= classify(name)%>>(
        updated<%= classify(name)%>List,
        index,
        action.item,
      );
      return {
        ...state,
        itemList: updated<%= classify(name)%>List,
        editIndex: -1,
        editItem: null,
        operationFailed: false,
        uiState: 'display' as UIState,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.deleteSuccess,
    (state, action): ItemStateInterface<<%= classify(name)%>> => {
      let updated<%= classify(name)%>List = [...state.itemList];
      const index = findIndexById<<%= classify(name)%>>(updated<%= classify(name)%>List, action.item.id);
      updated<%= classify(name)%>List = removeItem<<%= classify(name)%>>(updated<%= classify(name)%>List, index);
      return {
        ...state,
        itemList: updated<%= classify(name)%>List,
        operationFailed: false,
        isDeleting: false,
        uiState: 'display' as UIState,
        editIndex: -1,
        editItem: null,
      };
    },
  ),
  on(
    from<%= classify(name)%>Actions.updateFailure,
    (state): ItemStateInterface<<%= classify(name)%>> => ({
      ...state,
      editIndex: -1,
      editItem: null,
      operationFailed: true,
    }),
  ),
  on(
    from<%= classify(name)%>Actions.deleteFailure,
    (state): ItemStateInterface<<%= classify(name)%>> => ({
      ...state,
      editIndex: -1,
      editItem: null,
      isDeleting: false,
      operationFailed: true,
    }),
  ),
);

export function reducers(state: ItemStateInterface<<%= classify(name)%>>, action: Action) {
  return <%= camelize(name)%>Reducer(state, action);
}
