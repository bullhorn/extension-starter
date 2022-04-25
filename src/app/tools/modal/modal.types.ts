import { ModalParams, NovoModalParams } from 'novo-elements';

export interface CustomModalParams extends ModalParams {
  message: string;
  isConfirm: boolean;
  onClose: (result: boolean) => void;
}

export class StandardModalParams implements CustomModalParams {
  public message: string;
  public isConfirm = false;

  static fromNovo(params: NovoModalParams): StandardModalParams {
    return new StandardModalParams(params['message'], params['isConfirm'], params['onClose']);
  }

  public onClose: (result: boolean) => void = () => { };
  constructor(message: string, isConfirm: boolean = false, onClose: (result: boolean) => void = () => { }) {
    this.message = message;
    this.isConfirm = isConfirm;
    this.onClose = onClose;
  }
}
