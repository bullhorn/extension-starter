import {Component} from '@angular/core';

import {BaseRenderer} from 'novo-elements';

@Component({
  selector: 'delete-cell',
  template: `
    <button icon="delete" theme="icon" side="right" (click)="onClick()"></button>
  `,
  standalone: false
})
export class DeleteCellComponent extends BaseRenderer {

  onClick(): void {
    if(this.meta.onClick) {
      this.meta.onClick(this.data);
    }
  }

}
