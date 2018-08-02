import {NovoModalParams} from 'novo-elements';
import {ModalParams} from 'novo-elements/elements/modal/Modal';

export class StandardModalParams implements CustomModalParams {

  public message: string;
  public isConfirm: boolean = false;
  public onClose: (result: boolean) => void = () => {};

  constructor(message: string, isConfirm: boolean = false, onClose: (result: boolean) => void = () => {}) {
    this.message = message;
    this.isConfirm = isConfirm;
    this.onClose = onClose;
  }

  static fromNovo(params: NovoModalParams): StandardModalParams {
    return new StandardModalParams(
      params['message'],
      params['isConfirm'],
      params['onClose']
    );
  }

}

export interface CustomModalParams extends ModalParams {

  message: string;
  isConfirm: boolean;
  onClose: (result: boolean) => void;

}
