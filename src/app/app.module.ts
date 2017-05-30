// NG2
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'sample', pathMatch: 'full' },
  { path: 'sample', loadChildren: './sample/sample.module#SampleModule' }
];

@NgModule({
  declarations: [
    // Main Entry Component
    AppComponent
    // Modals/Popovers
  ],
  imports: [
    // NG2
    BrowserModule,
    RouterModule.forRoot(routes),
    // Vendor
    NovoElementsModule,
    // APP
  ],
  providers: [
    // Vendor Overrides
    // APP
  ],
  bootstrap: [
    // Main Entry Component
    AppComponent
    // Modals/Popovers
  ]
})
export class AppModule { }
