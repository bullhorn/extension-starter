import {Component} from '@angular/core';

import {BaseRenderer} from 'novo-elements';

@Component({
  selector: 'icon-cell',
  template: `
    <button [icon]="meta.icon" theme="icon" side="right" (click)="onClick()"></button>
  `,
  standalone: false
})
export class IconCellComponent extends BaseRenderer {

  onClick(): void {
    if(this.meta.onClick) {
      this.meta.onClick(this.data);
    }
  }

}
