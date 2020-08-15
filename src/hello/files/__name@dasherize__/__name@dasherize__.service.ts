import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { LoadFirestoreDataService } from '../afmodule/load-firestore-data.service';
import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { Noun } from '../utilities/types';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(name)%>Service {
  addingNew<%= classify(name)%>$ = new BehaviorSubject<boolean>(false);
  editIndex<%= classify(name)%>$ = new BehaviorSubject<number>(-1);
  pageTitle: Noun = {
    singular: '<%= classify(name)%>',
    plural: '<%= classify(name)%>s'
  };
  list$: Observable<<%= classify(name)%>[]>;
  length = 0;
  dataSub: Subscription;

  constructor(private dataService: LoadFirestoreDataService) {
    this.list$ = this.dataService.<%= camelize(name)%>List$;
  }

  isAddingNew(operation: boolean): void {
    this.addingNew<%= classify(name)%>$.next(operation);
  }

  setEditIndex(index: number) {
    this.editIndex<%= classify(name)%>$.next(index);
  }
}