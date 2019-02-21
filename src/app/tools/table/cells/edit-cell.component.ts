import {Component} from '@angular/core';

import {BaseRenderer} from 'novo-elements';

@Component({
  selector: 'edit-cell',
  template: `
    <button icon="edit" theme="icon" side="right" (click)="onClick()"></button>
  `
})
export class EditCellComponent extends BaseRenderer {

  onClick(): void {
    if(this.meta.onClick) {
      this.meta.onClick(this.data);
    }
  }

}
