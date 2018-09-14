// NG
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Vendor
import { NovoElementsModule, NovoElementProviders } from 'novo-elements';
// APP
import { SampleComponent } from './sample.component';

export const routes: Routes = [
  { path: '', component: SampleComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    // NG
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // Vendor
    NovoElementsModule,
    NovoElementProviders.forRoot(),
  ],
  declarations: [
    // APP
    SampleComponent,
  ],
  providers: [
    // Vendor Overrides
    // APP
  ],
})
export class SampleModule {}
