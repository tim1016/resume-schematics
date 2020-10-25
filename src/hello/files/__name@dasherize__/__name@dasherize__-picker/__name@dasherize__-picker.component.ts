import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { Subscription } from 'rxjs';
import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { IonSlides } from '@ionic/angular';
import { DocumentReference } from '@angular/fire/firestore';
import { FirestoreReferencesService } from 'src/app/afmodule/firestore-references.service';
import { Focus } from 'src/app/focus/focus.model';
import { SharedFeaturesService } from 'src/app/services/shared-features.service';
import { Store } from '@ngrx/store';
import * as from<%= classify(name)%>Actions from 'src/app/<%= dasherize(name)%>/store/actions';

declare type T = <%= classify(name)%>;

@Component({
  selector: 'app-<%= dasherize(name)%>-picker',
  templateUrl: './<%= dasherize(name)%>-picker.component.html',
  styleUrls: ['./<%= dasherize(name)%>-picker.component.scss'],
})
export class <%= classify(name)%>PickerComponent implements OnInit, OnDestroy {
  uiChanges: Subscription;
  numItems: number;
  numSelected = 0;
  list: <%= classify(name)%>[];
  selected: boolean[];
  sub: Subscription;
  // Slider props
  activeIndex = 0;
  isBeginning = true;
  isEnd = false;
  // slider options
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.4,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  selections: { <%= camelize(name)%>List: T[]; refList: DocumentReference[] } = {
    <%= camelize(name)%>List: [],
    refList: [],
  };

  @Input() filterFocusList: Focus[];
  @Output() <%= camelize(name)%>Selection = new EventEmitter<<%= classify(name)%>[]>();
  @ViewChild('selectionSlider', { static: true }) selectionSlider: IonSlides;

  constructor(
    public service: <%= classify(name)%>Service,
    private refService: FirestoreReferencesService,
    private sharedService: SharedFeaturesService,
    private store: Store
  ) {}

  ngOnInit() {
    this.sub = this.service.list$.subscribe((list) => {
      this.list = list;
      this.numItems = list.length;
      this.selected = list.map((item) => !item.id);
      if (this.numItems === 1) {
        this.selectItem(0);
      }
    });
  }

  async slideChanged() {
    this.activeIndex = await this.selectionSlider.getActiveIndex();
    this.isBeginning = await this.selectionSlider.isBeginning();
    this.isEnd = await this.selectionSlider.isEnd();
  }

  async next() {
    await this.selectionSlider.slideNext();
  }

  async prev() {
    await this.selectionSlider.slidePrev();
  }

  done() {
    this.selections.<%= camelize(name)%>List = [];
    this.selections.refList = [];
    this.selected.forEach((isSelected, index) => {
      if (isSelected) {
        const docRef = this.refService.<%= camelize(name)%>List.doc(this.list[index].id).ref;
        this.selections.<%= camelize(name)%>List.push(this.list[index]);
        this.selections.refList.push(docRef);
      }
    });
    this.<%= camelize(name)%>Selection.emit(this.selections.<%= camelize(name)%>List);
  }

  selectItem(i: number) {
    this.selected[i] = !this.selected[i];
    if (this.selected[i]) {
      this.numSelected++;
    } else {
      this.numSelected--;
    }
  }

  includesFilter(item: T) {
    return this.sharedService.includesFilter<T>(item, this.filterFocusList);
  }

  clearSelection() {
    this.selected = this.selected.map((_) => false);
    this.numSelected = 0;
  }

  startAddingNew() {
    this.store.dispatch(from<%= classify(name)%>Actions.startCreateNew());
  }

  ngOnDestroy() {
    if (this.sub) {this.sub.unsubscribe()}
  }
}
