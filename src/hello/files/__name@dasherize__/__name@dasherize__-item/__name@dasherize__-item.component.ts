import { OnInit, Input, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { FirestoreCrudService } from 'src/app/afmodule/firestore-crud.service';

declare type T = <%= classify(name)%>;
@Component({
  selector: 'app-<%= dasherize(name)%>-item',
  templateUrl: './<%= dasherize(name)%>-item.component.html',
  styleUrls: ['./<%= dasherize(name)%>-item.component.scss'],
})
export class <%= classify(name)%>ItemComponent implements OnInit {
  @Input() item: T;
  @Input() itemIndex: number;
  addingNew$: Observable<boolean>;
  editIndex$: Observable<number>;
  itemType = '<%= camelize(name)%>';
  firebaseCollectionName = this.itemType + 'List';

  constructor(private service: <%= classify(name)%>Service, private crud: FirestoreCrudService) {}

  ngOnInit() {
    this.editIndex$ = this.service.editIndex<%= classify(name)%>$;
    this.addingNew$ = this.service.addingNew<%= classify(name)%>$;
  }

  onDelete() {
    this.crud.deleteItem<T>(this.firebaseCollectionName, this.item);
  }

  onStartEdit(index: number) {
    this.service.setEditIndex(index);
  }

  onCancelEdit() {
    this.service.setEditIndex(-1);
  }

  onEdit(item: T) {
    this.crud.updateItem<T>(this.item.id, this.firebaseCollectionName, item);
    this.service.setEditIndex(-1);
  }
}
