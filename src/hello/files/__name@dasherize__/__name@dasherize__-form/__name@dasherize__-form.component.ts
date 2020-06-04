import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { rxFormConfig } from '../../utilities/rxFormValidation';

import { <%= classify(name)%> } from 'src/app/<%= dasherize(name)%>/<%= dasherize(name)%>.model';

@Component({
  selector: 'app-<%= dasherize(name)%>-form',
  templateUrl: './<%= dasherize(name)%>-form.component.html',
  styleUrls: ['./<%= dasherize(name)%>-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name)%>FormComponent implements OnInit {
  @Input() formMode: string;
  @Input() item: <%= classify(name)%>;

  @Output() editSuccessful = new EventEmitter<<%= classify(name)%>>();
  @Output() editCancelled = new EventEmitter<boolean>();
  @Output() addSuccessful = new EventEmitter<<%= classify(name)%>>();
  @Output() addCancelled = new EventEmitter<boolean>();

  form: FormGroup;
  @ViewChild('formRef') formRef: FormGroupDirective;

  constructor(private rxFormBuilder: RxFormBuilder) {}

  ngOnInit() {
    this.initRxForm(this.item?.title, this.item?.text);
  }

  initRxForm(title: string = '', text: string = '') {
    rxFormConfig();
    let new<%= classify(name)%> = new <%= classify(name)%>();
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
      new<%= classify(name)%>.seqNo = this.item?.seqNo;
      if (this.formMode === 'edit') {
        this.editSuccessful.emit(new<%= classify(name)%>);
      } else {
        this.addSuccessful.emit(new<%= classify(name)%>);
      }
    } else {
      console.log('form was not valid');
    }
  }

  onCancel() {
    this.form.reset();
    if (this.formMode === 'edit') {
      this.editCancelled.emit(true);
    } else {
      this.addCancelled.emit(true);
    }
  }
}
