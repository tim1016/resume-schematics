import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { rxFormConfig } from 'src/app/utilities/functions';

import { <%= classify(name)%> } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';
import { <%= classify(name)%>Service } from '@app/<%= dasherize(name)%>/<%= dasherize(name)%>.service';
import { Focus } from '@app/focus/focus.model';
import { CredentialsService } from '@app/auth/credentials.service';

import { Logger } from '@app/core/logger.service';
const log = new Logger('<%= classify(name)%>FormComponent');

@Component({
  selector: 'app-<%= dasherize(name)%>-form',
  templateUrl: './<%= dasherize(name)%>-form.component.html',
  styleUrls: ['./<%= dasherize(name)%>-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name)%>FormComponent implements OnInit {
  @Input() formMode: string;
  @Input() item: <%= classify(name)%>;
  @Input() actionMode: string;

  @Output() editSuccessful = new EventEmitter<<%= classify(name)%>>();
  @Output() editCancelled = new EventEmitter<boolean>();
  @Output() addSuccessful = new EventEmitter<<%= classify(name)%>>();
  @Output() addCancelled = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<void>();

  form: FormGroup;
  focusList: Focus[] = [];
  focusRefList: string[] = [];
  toggleAdvanced = false;

  @ViewChild('formRef') formRef: FormGroupDirective;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    public service: <%= classify(name)%>Service,
    private credentialsService: CredentialsService,
  ) {}

  ngOnInit() {
    if (!this.item) {
      this.item = new <%= classify(name)%>();
    }
    this.focusList = this.item.focus;
    this.focusRefList = this.item.focusRef;
    this.initRxForm();
  }

  initRxForm() {
    rxFormConfig();
    let newItem = new <%= classify(name)%>();
    newItem = Object.assign(newItem, this.item);
    this.form = this.rxFormBuilder.formGroup(newItem);
  }

  submitForm() {
    this.formRef.onSubmit(undefined);
  }

  onSubmit() {
    if (this.formMode === 'edit') {
      this.editSuccessful.emit(this.createNew());
    } else {
      this.addSuccessful.emit(this.createNew());
    }
  }

  createNew(): <%= classify(name)%> {
    let newItem = new <%= classify(name)%>();
    newItem = Object.assign(newItem, this.form.value);
    newItem.focus = this.focusList;
    newItem.focusRef = this.focusRefList;
    newItem.seqNo = this.item?.seqNo;
    return newItem;
  }

  onDelete() {
    this.form.reset();
    this.delete.emit();
  }

  onCancel() {
    this.form.reset();
    if (this.formMode === 'edit') {
      this.editCancelled.emit(true);
    } else {
      this.addCancelled.emit(true);
    }
  }

  updateFocus(focii: Focus[]) {
    this.focusList = [];
    this.focusRefList = [];
    for (const focus of focii) {
      const focusPath = this.credentialsService.collectionPath('focus') + '/' + focus.id;
      this.focusList.push(focus);
      this.focusRefList.push(focusPath);
    }
  }
}
