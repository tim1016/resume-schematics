import { OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Summary } from 'src/app/model/summary.model';
import { InteractionService } from '../../services/interaction.service';
import { FirestoreCrudService } from 'src/app/afmodule/firestore-crud.service';

declare type T = Summary;
export class SummaryItemComponent implements OnInit {
         @Input() item: T;
         @Input() itemIndex: number;
         addingNew$: Observable<boolean>;
         editIndex$: Observable<number>;
         itemType = 'summary';
         firebaseCollectionName = this.itemType + 'List';

         constructor(private service: InteractionService, private crud: FirestoreCrudService) {}

         ngOnInit() {
           this.editIndex$ = this.service.editIndexSummary$;
           this.addingNew$ = this.service.addingNewSummary$;
         }

         onDelete() {
           this.crud.deleteItem<T>(this.firebaseCollectionName, this.item);
         }

         onStartEdit(index: number) {
           this.service.setEditIndex(this.itemType, index);
         }

         onCancelEdit() {
           this.service.setEditIndex(this.itemType, -1);
         }

         onEdit(item: T) {
           this.crud.updateItem<T>(this.item.id, this.firebaseCollectionName, item);
           this.service.setEditIndex(this.itemType, -1);
         }
       }
