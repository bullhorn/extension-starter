import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NovoElementProviders, NovoElementsModule} from 'novo-elements';

import {StandardModalComponent} from './standard/standard-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NovoElementsModule,
    NovoElementProviders.forChild()
  ],
  declarations: [
    StandardModalComponent
  ],
  entryComponents: [
    StandardModalComponent
  ],
  exports: [
    StandardModalComponent
  ]
})
export class ModalModule { }
