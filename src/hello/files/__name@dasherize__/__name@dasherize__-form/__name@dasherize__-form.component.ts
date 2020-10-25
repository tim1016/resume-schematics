import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { rxFormConfig } from 'src/app/utilities/functions';

import { <%= classify(name)%> } from 'src/app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { Focus } from 'src/app/focus/focus.model';
import { FirestoreReferencesService } from 'src/app/afmodule/firestore-references.service';
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
  focusList: Focus[];
  focusRefList: string[];
  toggleAdvanced = false;
  
  @ViewChild('formRef') formRef: FormGroupDirective;

  constructor(
    private rxFormBuilder: RxFormBuilder, 
    public service: <%= classify(name)%>Service,
    private refService: FirestoreReferencesService
  ) {}

  ngOnInit() {
    if (this.item) {
      this.initRxForm(this.item.title, this.item.text);
      this.focusList = this.item.focus;
      this.focusRefList = this.item.focusRef;
    } else {
      this.initRxForm();
      this.focusList = [];
      this.focusRefList = [];
    }
  }

  initRxForm(title: string = '', text: string = '') {
    rxFormConfig();
    const new<%= classify(name)%> = new <%= classify(name)%>();
    new<%= classify(name)%>.title = title;
    new<%= classify(name)%>.text = text;
    this.form = this.rxFormBuilder.formGroup(new<%= classify(name)%>);
  }

  submitForm() {
    this.formRef.onSubmit(undefined);
  }

  onSubmit() {
    if (this.form.valid) {
      const { title, text } = this.form.value;
      const new<%= classify(name)%> = new <%= classify(name)%>();
      new<%= classify(name)%>.title = title;
      new<%= classify(name)%>.text = text;
      new<%= classify(name)%>.focus = this.focusList;
      new<%= classify(name)%>.focusRef = this.focusRefList;
      new<%= classify(name)%>.seqNo = this.item?.seqNo;
      if (this.formMode === 'edit') {
        this.editSuccessful.emit(new<%= classify(name)%>);
      } else {
        this.addSuccessful.emit(new<%= classify(name)%>);
      }
    } else {
      log.debug('form was not valid');
    }
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
      const ref = this.refService.focusList.doc(focus.id).ref;
      this.focusList.push(focus);
      this.focusRefList.push(ref.path);
    }
  }
}
