import { OnInit, Input, Component } from '@angular/core';

import { <%= classify(name)%> } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';
import { <%= classify(name)%>Service } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.service';
import { ComponentControllerService } from '@app/services/componentController.service';
import { Logger } from '@app/core';

const log = new Logger('<%= classify(name)%>ItemComponent');

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

  constructor(public service: <%= classify(name)%>Service, private controllerService: ComponentControllerService) {}

  ngOnInit() {}

  async onDelete() {
    this.service.setUItoDeleting();
    const confirm = await this.controllerService.presentAlertConfirm(
      'Confirm delete',
      'Do you really want to delete this item?'
    );
    if (confirm) {
      this.service.delete(this.item.id);
    }
  }

  onStartEdit(index: number): void {
    this.service.setUItoUpdating(index);
  }

  onCancelEdit() {
    this.service.cancel();
  }

  onEdit(item: T) {
    this.service.update(item, this.item.id);
  }
}
