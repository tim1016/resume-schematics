import { Component, OnInit, Input } from '@angular/core';
import { FirestoreCrudService } from 'src/app/afmodule/firestore-crud.service';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';

declare type T = <%= classify(name)%>;

@Component({
  selector: 'app-<%= dasherize(name)%>-add-new',
  templateUrl: './<%= dasherize(name)%>-add-new.component.html',
  styleUrls: ['./<%= dasherize(name)%>-add-new.component.scss'],
})
export class <%= classify(name)%>AddNewComponent implements OnInit {
  @Input() list: T[];
  itemType = '<%= camelize(name)%>';
  firebaseCollectionName = this.itemType + 'List';
  
  constructor(
    private service: <%= classify(name)%>Service, 
    private crud: FirestoreCrudService
  ) {}

  ngOnInit() {}

  onAdd(item: T) {
    const newItem = { ...item, seqNo: getSeqNo(this.list) };
    this.crud.addItem<T>(this.firebaseCollectionName, newItem);
    this.service.isAddingNew(false);
  }

  onCancelAdd() {
    this.service.isAddingNew(false);
  }
}
