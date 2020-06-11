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
  uiChanges: Subscription;
  addingNew$: Observable<boolean>;
  pageTitle : string;
  list: T[];
  addingNew = false;
  length = 0;
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
	  this.length = list.length;
    });
    this.addingNew$ = this.service.addingNew<%= classify(name)%>$;
    this.pageTitle = this.service.pageTitle;
    this.uiChanges = this.addingNew$.subscribe(val => {
      this.addingNew = val;
    });
  }

  startAddingNew() {
    this.service.isAddingNew(true);
  }

  onAdd(item: T) {
    let newSeqNo = 1;
    if (this.list.length > 0) {
      newSeqNo = this.list[this.list.length - 1].seqNo + 1;
    }
    const newItem = { ...item, seqNo: newSeqNo };
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
    if (this.uiChanges) this.uiChanges.unsubscribe;
  }
}
