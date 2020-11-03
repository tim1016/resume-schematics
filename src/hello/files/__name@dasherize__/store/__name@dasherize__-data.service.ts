import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';

import { <%= classify(name)%> } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';
import { CredentialsService } from '@app/auth/credentials.service';
import { ReadFirestoreDataService } from '@app/afmodule/read-firestore-data.service';
import { FirestoreUtilitiesService } from '@app/afmodule/firestore-utilities.service';

@Injectable()
export class <%= classify(name)%>DataService extends DefaultDataService<<%= classify(name)%>> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private credentials: CredentialsService,
    private readFirestoreDataService: ReadFirestoreDataService,
    private firestoreUtilities: FirestoreUtilitiesService,
  ) {
    super('<%= classify(name)%>', http, httpUrlGenerator);
  }

  getAll() {
    return this.readFirestoreDataService.getListWithFocus<<%= classify(name)%>>(this.credentials.collectionPath('<%= camelize(name)%>'));
  }

  update(item: Update<<%= classify(name)%>>) {
    return this.firestoreUtilities.update2<<%= classify(name)%>>(this.credentials.collectionPath('<%= camelize(name)%>'), item);
  }

  add(item: <%= classify(name)%>) {
    return this.firestoreUtilities.add2<<%= classify(name)%>>(this.credentials.collectionPath('<%= camelize(name)%>'), item);
  }

  delete(id: string) {
    return this.firestoreUtilities.delete2<<%= classify(name)%>>(this.credentials.collectionPath('<%= camelize(name)%>'), id);
  }
}
