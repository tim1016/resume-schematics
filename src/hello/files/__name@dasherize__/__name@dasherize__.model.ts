import { required, prop } from '@rxweb/reactive-form-validators';
import { Focus } from '../focus/focus.model';

export class <%= classify(name)%> {
  @required()
  title: string;
  @required()
  text: string;
  @required()
  focus: Focus[] = [];
  @prop()
  focusRef: string[];
  seqNo: number;
  id: string;
}
