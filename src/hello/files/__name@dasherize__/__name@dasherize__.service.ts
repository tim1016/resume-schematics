import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(name)%>Service {
  addingNew<%= classify(name)%>$ = new BehaviorSubject<boolean>(false);
  editIndex<%= classify(name)%>$ = new BehaviorSubject<number>(-1);

  constructor() {}

  isAddingNew(operation: boolean): void {
    this.addingNew<%= classify(name)%>$.next(operation);
  }

  setEditIndex(index: number) {
    this.editIndex<%= classify(name)%>$.next(index);
  }
}
