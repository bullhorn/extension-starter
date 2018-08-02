import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NovoElementProviders, NovoElementsModule} from 'novo-elements';

import {PreviewCell} from './cells/preview-cell.component';

@NgModule({
  imports: [
    CommonModule,
    NovoElementsModule,
    NovoElementProviders.forChild()
  ],
  declarations: [
    PreviewCell
  ],
  exports: [
    PreviewCell
  ]
})
export class TableModule { }
