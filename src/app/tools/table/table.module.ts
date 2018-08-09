import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NovoElementProviders, NovoElementsModule} from 'novo-elements';

import {PreviewCellComponent} from './cells/preview-cell.component';
import {DeleteCellComponent} from './cells/delete-cell.component';
import {EditCellComponent} from './cells/edit-cell.component';
import {IconCellComponent} from './cells/icon-cell.component';
import {TableDataProvider} from './service/table-data-provider.service';

@NgModule({
  imports: [
    CommonModule,
    NovoElementsModule,
    NovoElementProviders.forChild()
  ],
  declarations: [
    PreviewCellComponent,
    DeleteCellComponent,
    EditCellComponent,
    IconCellComponent
  ],
  entryComponents: [
    PreviewCellComponent,
    DeleteCellComponent,
    EditCellComponent,
    IconCellComponent
  ],
  exports: [
    PreviewCellComponent,
    DeleteCellComponent,
    EditCellComponent,
    IconCellComponent
  ]
})
export class TableModule { }
