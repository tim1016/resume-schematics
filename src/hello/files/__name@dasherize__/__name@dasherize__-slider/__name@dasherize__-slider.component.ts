import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { <%= classify(name)%>Service } from '../<%= dasherize(name)%>.service';
import { Observable, Subscription } from 'rxjs';
import { <%= classify(name)%> } from '../<%= dasherize(name)%>.model';
import { IonSlides } from '@ionic/angular';
import { DocumentReference } from '@angular/fire/firestore';
import { FirestoreReferencesService } from 'src/app/afmodule/firestore-references.service';
import { Noun } from 'src/app/utilities/types';

@Component({
  selector: 'app-<%= dasherize(name)%>-slider',
  templateUrl: './<%= dasherize(name)%>-slider.component.html',
  styleUrls: ['./<%= dasherize(name)%>-slider.component.scss'],
})
export class <%= classify(name)%>SliderComponent implements OnInit {
  pageTitle: Noun;
  uiChanges: Subscription;
  addingNew = false;
  numItems: number;
  numSelected = 0;
  list: <%= classify(name)%>[];
  selected: boolean[];
  sub: Subscription;
  // Slider props
  activeIndex: number = 0;
  isBeginning = true;
  isEnd = false;
  // slider options
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1,
  };

  selections: { <%= camelize(name)%>List: <%= classify(name)%>[]; refList: DocumentReference[] } = {
    <%= camelize(name)%>List: [],
    refList: [],
  };

  @Output() <%= camelize(name)%>Selection = new EventEmitter<DocumentReference[]>();
  @ViewChild('selectionSlider', { static: true }) selectionSlider: IonSlides;

  constructor(
    private service: <%= classify(name)%>Service,
    private refService: FirestoreReferencesService
  ) {}

  ngOnInit() {
    this.pageTitle = this.service.pageTitle;
    this.sub = this.service.list$.subscribe((list) => {
      this.list = list;
      this.numItems = list.length;
      this.selected = list.map((item) => !item.id);
      if (this.numItems === 1) {
        this.selectItem(0);
      }
    });
    this.uiChanges = this.service.addingNew<%= classify(name)%>$.subscribe((val) => {
      this.addingNew = val;
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
        let docRef = this.refService.<%= camelize(name)%>List.doc(this.list[index].id).ref;
        this.selections.<%= camelize(name)%>List.push(this.list[index]);
        this.selections.refList.push(docRef);
      }
    });
    // console.log(this.selections.length);
    // this.selections.<%= camelize(name)%>List.forEach((item) => console.log(item.title));
    this.<%= camelize(name)%>Selection.emit(this.selections.refList);
  }

  selectItem(i: number) {
    this.selected[i] = !this.selected[i];
    if (this.selected[i]) {
      this.numSelected++;
    } else {
      this.numSelected--;
    }
  }

  clearSelection() {
    this.selected = this.selected.map((_) => false);
    this.numSelected = 0;
  }

  startAddingNew() {
    this.service.isAddingNew(true);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
