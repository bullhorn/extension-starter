import {Component} from '@angular/core';

import {BaseRenderer} from 'novo-elements';

@Component({
  selector: 'preview-cell',
  template: `
    <button icon="preview" theme="icon" side="right" (click)="onClick()"></button>
  `
})
export class PreviewCellComponent extends BaseRenderer {

  onClick(): void {
    if(this.meta.onClick) {
      this.meta.onClick(this.data);
    }
  }

}
