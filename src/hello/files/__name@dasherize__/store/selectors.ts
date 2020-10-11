import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/types/appState.interface';
import { ItemStateInterface } from 'src/app/store/types/ItemState.interface';
import { <%= classify(name)%> } from 'src/app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';
import { UIState } from '../../utilities/types';

export const <%= camelize(name)%>FeatureSelector = createFeatureSelector<
  AppStateInterface,
  ItemStateInterface<<%= classify(name)%>>
>('<%= camelize(name)%>');

export const <%= camelize(name)%>List = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): <%= classify(name)%>[] => itemState.itemList,
);
export const editIndex = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): number => itemState.editIndex,
);
export const editItem = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): <%= classify(name)%> => itemState.editItem,
);
export const addingNew = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): boolean => itemState.isAdding,
);
export const isReading = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): boolean => itemState.isReading,
);
export const modifications = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): boolean => {
    return (
      itemState.isAdding || itemState.isDeleting || itemState.editIndex !== -1
    );
  },
);
export const operationFailed = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): boolean =>
    itemState.operationFailed,
);
export const uiState = createSelector(
  <%= camelize(name)%>FeatureSelector,
  (itemState: ItemStateInterface<<%= classify(name)%>>): UIState => itemState.uiState,
);
