import {Component} from '@angular/core';

import {BaseRenderer} from 'novo-elements';

@Component({
  selector: 'preview-cell',
  template: `
    <button class="modal-close" icon="preview" theme="icon" side="right" (click)="meta.preview(data)"></button>
  `
})
export class PreviewCell extends BaseRenderer {

  constructor() {
    super();
  }

}
