import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { <%= classify(name)%> } from '../model/<%= dasherize(name)%>.model';
import { LoadFirestoreDataService } from '../afmodule/load-firestore-data.service';

import { getNewSeqNo } from '../utilities/getNewSeqNo';
import { FirestoreCrudService } from '../afmodule/firestore-crud.service';
import { InteractionService } from '../services/interaction.service';

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
  itemType = '<%= dasherize(name)%>';
  firebaseCollectionName = this.itemType + 'List';

  constructor(
    private service: InteractionService,
    private dataService: LoadFirestoreDataService,
    private crud: FirestoreCrudService
  ) {}

  ngOnInit() {
    this.dataSub = this.dataService.<%= dasherize(name)%>List$.subscribe(list => {
      this.list = list;
    });
    this.addingNew$ = this.service.addingNewSummary$;
  }

  startAddingNew() {
    this.service.isAddingNew(this.itemType, true);
  }

  onAdd(item: T) {
    const newItem = { ...item, seqNo: this.list[this.list.length - 1].seqNo + 1 };
    this.crud.addItem<T>(this.firebaseCollectionName, newItem);
    this.service.isAddingNew(this.itemType, false);
  }

  onCancelAdd() {
    this.service.isAddingNew(this.itemType, false);
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
