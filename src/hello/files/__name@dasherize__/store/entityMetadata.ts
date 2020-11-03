import { compare } from '@app/utilities/functions';
import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  <%= classify(name)%>: {
    sortComparer: compare,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};
