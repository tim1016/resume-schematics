import { required } from '@rxweb/reactive-form-validators';

export class <%= classify(name)%> {
  @required()
  title: string;
  @required()
  text: string;
  seqNo: number;
  id: string;
}
