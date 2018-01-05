import {BaseRenderer} from 'novo-elements';
import {Component} from '@angular/core';


@Component({
  selector: 'entity-link-cell',
  template: `
    <div (click)="onClick()" class="circle-link">
      <span *ngIf="meta.link && meta.link.color" class="circle" [style.background-color]="meta.link.color">
      </span>
      <a>
        {{ getDisplay() }}
      </a>
    </div>
  `,
  styles: [
    `
      .circle {
        border-radius: 50%;
        display: inline-block;
        width: 10px;
        height: 10px;
      }
    `
  ]
})
export class EntityLinkCell extends BaseRenderer {

  constructor() {
    super();
  }

  onClick(): void {
    if (this.meta.link && this.meta.link.clicked) {
      this.meta.link.clicked(this.data);
    }
  }

  getDisplay(): string {
    if (this.meta.link && this.meta.link.getDisplay) {
      return this.meta.link.getDisplay(this.data);
    }

    return '';
  }

}
