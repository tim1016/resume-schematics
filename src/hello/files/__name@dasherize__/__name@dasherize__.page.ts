import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { LoadFirestoreDataService } from '../afmodule/load-firestore-data.service';

import { getNewSeqNo } from '../utilities/getNewSeqNo';
import { FirestoreCrudService } from '../afmodule/firestore-crud.service';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';

declare type T = <%= classify(name)%>;
@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: './<%= dasherize(name)%>.page.html',
  styleUrls: ['./<%= dasherize(name)%>.page.scss'],
})
export class <%= classify(name)%>Page implements OnInit, OnDestroy {
  dataSub: Subscription;
  addingNew$: Observable<boolean>;
  pageTitle = '<%= classify(name)%>';
  list: T[];
  itemType = '<%= camelize(name)%>';
  firebaseCollectionName = this.itemType + 'List';

  constructor(
    private service: <%= classify(name)%>Service,
    private dataService: LoadFirestoreDataService,
    private crud: FirestoreCrudService
  ) {}

  ngOnInit() {
    this.dataSub = this.dataService.<%= camelize(name)%>List$.subscribe(list => {
      this.list = list;
    });
    this.addingNew$ = this.service.addingNew<%= classify(name)%>$;
  }

  startAddingNew() {
    this.service.isAddingNew(true);
  }

  onAdd(item: T) {
    const newItem = { ...item, seqNo: this.list[this.list.length - 1].seqNo + 1 };
    this.crud.addItem<T>(this.firebaseCollectionName, newItem);
    this.service.isAddingNew(false);
  }

  onCancelAdd() {
    this.service.isAddingNew(false);
  }

  doReorder(event: any) {
    const newSeqNo = getNewSeqNo<T>(event.detail.from, event.detail.to, this.list.slice());
    let newItem = this.list[event?.detail?.from];
    newItem = { ...newItem, seqNo: newSeqNo };
    this.crud.updateItem<T>(newItem.id, this.firebaseCollectionName, newItem);
    event.detail.complete();
  }

  ngOnDestroy() {
    if (this.dataSub) this.dataSub.unsubscribe;
  }
}
