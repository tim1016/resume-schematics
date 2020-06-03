import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { rxFormConfig } from '../../utilities/rxFormValidation';

import { Summary } from 'src/app/model/summary.model';

@Component({
  selector: 'app-summary-form',
  templateUrl: './summary-form.component.html',
  styleUrls: ['./summary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryFormComponent implements OnInit {
  @Input() formMode: string;
  @Input() item: Summary;

  @Output() editSuccessful = new EventEmitter<Summary>();
  @Output() editCancelled = new EventEmitter<boolean>();
  @Output() addSuccessful = new EventEmitter<Summary>();
  @Output() addCancelled = new EventEmitter<boolean>();

  form: FormGroup;
  @ViewChild('formRef') formRef: FormGroupDirective;

  constructor(private rxFormBuilder: RxFormBuilder) {}

  ngOnInit() {
    this.initRxForm(this.item?.title, this.item?.text);
  }

  initRxForm(title: string = '', text: string = '') {
    rxFormConfig();
    let summary = new Summary();
    summary.title = title;
    summary.text = text;
    this.form = this.rxFormBuilder.formGroup(summary);
  }

  submitForm() {
    this.formRef.onSubmit(undefined);
  }

  onSubmit() {
    if (this.form.valid) {
      const { title, text } = this.form.value;
      const newSummary = new Summary();
      newSummary.title = title;
      newSummary.text = text;
      newSummary.seqNo = this.item?.seqNo;
      if (this.formMode === 'edit') {
        this.editSuccessful.emit(newSummary);
      } else {
        this.addSuccessful.emit(newSummary);
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
