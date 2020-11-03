import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { <%= classify(name)%> } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';

@Injectable()
export class <%= classify(name)%>EntityService extends EntityCollectionServiceBase<<%= classify(name)%>> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('<%= classify(name)%>', serviceElementsFactory);
  }
}
