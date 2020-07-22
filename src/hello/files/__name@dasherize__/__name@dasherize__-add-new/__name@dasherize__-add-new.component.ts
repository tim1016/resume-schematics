import { Component, OnInit, Input } from '@angular/core';
import { FirestoreCrudService } from 'src/app/afmodule/firestore-crud.service';
import { SummaryService } from '../summary.service';
import { Summary } from '../summary.model';

declare type T = Summary;

@Component({
  selector: 'app-summary-add-new',
  templateUrl: './summary-add-new.component.html',
  styleUrls: ['./summary-add-new.component.scss'],
})
export class SummaryAddNewComponent implements OnInit {
  @Input() list: T[];
  itemType = 'summary';
  firebaseCollectionName = this.itemType + 'List';
  constructor(private service: SummaryService, private crud: FirestoreCrudService) {}

  ngOnInit() {}

  onAdd(item: T) {
    const newItem = { ...item, seqNo: this.list[this.list.length - 1].seqNo + 1 };
    this.crud.addItem<T>(this.firebaseCollectionName, newItem);
    this.service.isAddingNew(false);
  }

  onCancelAdd() {
    this.service.isAddingNew(false);
  }
}
