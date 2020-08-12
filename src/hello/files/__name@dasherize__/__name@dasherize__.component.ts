import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { <%= classify(name)%> } from './<%= dasherize(name)%>.model';
import { getNewSeqNo } from '../utilities/getNewSeqNo';
import { FirestoreCrudService } from '../afmodule/firestore-crud.service';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';

declare type T = <%= classify(name)%>;
@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: './<%= dasherize(name)%>.component.html',
  styleUrls: ['./<%= dasherize(name)%>.component.scss'],
})
export class <%= classify(name)%>Component implements OnInit, OnDestroy {
  uiChanges: Subscription;
  addingNew = false;
  pageTitle: string;
  list: T[];
  numItems: number;
  itemType = '<%= camelize(name)%>';
  firebaseCollectionName = this.itemType + 'List';
  filteredFocus = '';

  constructor(
    private service: <%= classify(name)%>Service, 
    private crud: FirestoreCrudService
    ) {}

  ngOnInit() {
    this.pageTitle = this.service.pageTitle;
    this.service.list$.subscribe(list => {
      this.list = list;
      this.numItems = list.length;
    });
    this.uiChanges = this.service.addingNew<%= classify(name)%>$.subscribe(val => {
      this.addingNew = val;
    });
  }

  startAddingNew() {
    this.service.isAddingNew(true);
  }

  doReorder(event: any) {
    const { from, to } = event.detail;
    const newSeqNo = getNewSeqNo<T>(from, to, this.list.slice());
    let newItem = this.list[from];
    newItem = { ...newItem, seqNo: newSeqNo };
    this.crud.updateItem<T>(newItem.id, this.firebaseCollectionName, newItem);
    event.detail.complete();
  }

  includesFilter(item: T) {
    if (this.filteredFocus.trim() == '') return true;
    let include = false;
    for (const focus of item.focus) {
      if (focus.name.toLowerCase().includes(this.filteredFocus.toLowerCase()))
        include = true;
    }
    return include;
  }

  ngOnDestroy() {
    if (this.uiChanges) this.uiChanges.unsubscribe;
  }
}
