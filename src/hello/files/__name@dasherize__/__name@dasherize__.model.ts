import { required, prop } from '@rxweb/reactive-form-validators';
import { DocumentReference } from '@angular/fire/firestore';
import { Focus } from '../focus/focus.model';

export class <%= classify(name)%> {
  @required()
  title: string;
  @required()
  text: string;
  @required()
  focus: Focus[] = [];
  @prop()
  focusRef: DocumentReference[];
  seqNo: number;
  id: string;
}
