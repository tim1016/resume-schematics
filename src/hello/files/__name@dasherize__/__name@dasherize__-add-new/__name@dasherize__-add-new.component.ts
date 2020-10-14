import { Component, OnInit, Input } from '@angular/core';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { getSeqNo } from 'src/app/utilities/functions';
import { Store } from '@ngrx/store';
import * as from<%= classify(name)%>Actions from '../store/actions';

declare type T = <%= classify(name)%>;

@Component({
  selector: 'app-<%= dasherize(name)%>-add-new',
  templateUrl: './<%= dasherize(name)%>-add-new.component.html',
  styleUrls: ['./<%= dasherize(name)%>-add-new.component.scss'],
})
export class <%= classify(name)%>AddNewComponent implements OnInit {
  @Input() list: T[];

  constructor(private store: Store) {}

  ngOnInit() {}

  onAdd(item: T) {
    const newItem = { ...item, seqNo: getSeqNo(this.list) };
    this.store.dispatch(from<%= classify(name)%>Actions.createNew({ payload: newItem }));
  }

  onCancelAdd() {
    this.store.dispatch(from<%= classify(name)%>Actions.cancel());
  }
}
