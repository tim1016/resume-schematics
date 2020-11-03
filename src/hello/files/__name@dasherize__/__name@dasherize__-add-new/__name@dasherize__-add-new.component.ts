import { Component, OnInit, Input } from '@angular/core';
import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { getSeqNo } from 'src/app/utilities/functions';
import { <%= classify(name)%>Service } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.service';

declare type T = <%= classify(name)%>;

@Component({
  selector: 'app-<%= dasherize(name)%>-add-new',
  templateUrl: './<%= dasherize(name)%>-add-new.component.html',
  styleUrls: ['./<%= dasherize(name)%>-add-new.component.scss'],
})
export class <%= classify(name)%>AddNewComponent implements OnInit {
  @Input() list: T[];

  constructor(private service: <%= classify(name)%>Service) {}

  ngOnInit() {}

  onAdd(item: T) {
    const newItem = { ...item, seqNo: getSeqNo(this.list) };
    this.service.add(newItem);
  }

  onCancelAdd() {
    this.service.cancel();
  }
}
