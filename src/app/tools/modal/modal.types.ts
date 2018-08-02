import {NovoModalParams} from 'novo-elements';
import {ModalParams} from 'novo-elements/elements/modal/Modal';

export class StandardModalParams extends NovoModalParams implements CustomModalParams {

  public message: string;
  public isConfirm: boolean = false;
  public onClose: (result: boolean) => void = () => {};

  constructor(message: string, isConfirm: boolean = false, onClose: (result: boolean) => void = () => {}) {
    super();
    this.message = message;
    this.isConfirm = isConfirm;
    this.onClose = onClose;
  }

}

export interface CustomModalParams extends ModalParams {

  message: string;
  isConfirm: boolean;
  onClose: (result: boolean) => void;

}
