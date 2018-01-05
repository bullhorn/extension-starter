// NG2
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { AppComponent } from './app.component';
import { AppBridgeService } from './service/app-bridge.service';
import {EntityLinkCell} from './core/table/entity-link-cell.component';

const routes: Routes = [
  { path: '', redirectTo: 'sample', pathMatch: 'full' },
  { path: 'sample', loadChildren: './sample/sample.module#SampleModule' }
];

@NgModule({
  declarations: [
    // Main Entry Component
    AppComponent,
    EntityLinkCell
    // Modals/Popovers
  ],
  imports: [
    // NG2
    BrowserModule,
    RouterModule.forRoot(routes),
    // Vendor
    NovoElementsModule
    // APP
  ],
  entryComponents: [
    EntityLinkCell
  ],
  providers: [
    AppBridgeService
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
