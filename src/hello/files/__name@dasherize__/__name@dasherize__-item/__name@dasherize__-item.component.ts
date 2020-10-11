import { OnInit, Input, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { Focus } from 'src/app/focus/focus.model';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { Store } from '@ngrx/store';

import * as from<%= classify(name)%>Actions from 'src/app/<%= dasherize(name)%>/store/actions';

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
  addingNew$: Observable<boolean>;
  editIndex$: Observable<number>;
  itemType = '<%= camelize(name)%>';
  alert: HTMLIonAlertElement;
  firebaseCollectionName = this.itemType + 'List';
  focusList$: Observable<Focus>[];

  constructor(
    public service: <%= classify(name)%>Service,
    private store: Store,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  async onDelete() {
    this.store.dispatch(from<%= classify(name)%>Actions.startDelete());
    const confirm = await this.presentAlertConfirm();
    if (confirm) {
      this.confirmDelete();
    } else {
      this.confirmCancel();
    }
  }

  onStartEdit(index: number) {
    this.store.dispatch(from<%= classify(name)%>Actions.startUpdate({ index }));
  }

  onCancelEdit() {
    this.store.dispatch(from<%= classify(name)%>Actions.cancel());
  }

  onEdit(item: T) {
    const updatedItem = { ...item, id: this.item.id };
    this.store.dispatch(from<%= classify(name)%>Actions.update({ item: updatedItem }));
  }

  async presentAlertConfirm() {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });
    this.alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Do you want to delete this item ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolveFunction(false),
        },
        {
          text: 'Yes',
          handler: () => resolveFunction(true),
        },
      ],
    });
    await this.alert.present();
    return promise;
  }

  confirmDelete() {
    this.store.dispatch(from<%= classify(name)%>Actions.deleteItem({ item: this.item }));
  }
  confirmCancel() {
    this.store.dispatch(from<%= classify(name)%>Actions.cancel());
  }
}
