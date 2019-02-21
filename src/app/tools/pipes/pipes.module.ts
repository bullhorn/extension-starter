import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafePipe} from './safe/safe.pipe';
import { GroupByPipe } from './group-by/group-by.pipe';
import { KeysPipe } from './keys/keys.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafePipe,
    GroupByPipe,
    KeysPipe
  ],
  exports: [
    SafePipe,
    GroupByPipe,
    KeysPipe
  ]
})
export class PipesModule { }
