import { OnInit, Input, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';

import * as from<%= classify(name)%>Actions from 'src/app/<%= dasherize(name)%>/store/actions';
import { SharedFeaturesService } from '../../services/shared-features.service';

declare type T = <%= classify(name)%>;
@Component({
  selector: 'app-<%= dasherize(name)%>-item',
  templateUrl: './<%= dasherize(name)%>-item.component.html',
  styleUrls: ['./<%= dasherize(name)%>-item.component.scss'],
})
export class <%= classify(name)%>ItemComponent implements OnInit {
  @Input() item: T;
  @Input() itemIndex: number;
  @Input() showToolbar: boolean;
  @Input() hideBadge: boolean;
  
  constructor(public service: <%= classify(name)%>Service, private store: Store, public sharedService: SharedFeaturesService) {}

  ngOnInit() {}

  async onDelete() {
    this.store.dispatch(from<%= classify(name)%>Actions.startDelete());
    const confirm = await this.sharedService.presentAlertConfirm(
      'Confirm delete',
      'Do you really want to delete this item?',
    );
    if (confirm) {
      this.store.dispatch(from<%= classify(name)%>Actions.deleteItem({ item: this.item }));
    } else {
      this.store.dispatch(from<%= classify(name)%>Actions.cancel({ message: 'Item was not deleted' }));
    }
  }

  onStartEdit(index: number) {
    this.store.dispatch(from<%= classify(name)%>Actions.startUpdate({ index }));
  }

  onCancelEdit() {
    this.store.dispatch(from<%= classify(name)%>Actions.cancel({ message: 'The changes were discarded' }));
  }

  onEdit(item: T) {
    const updatedItem = { ...item, id: this.item.id };
    this.store.dispatch(from<%= classify(name)%>Actions.update({ item: updatedItem }));
  }
}
