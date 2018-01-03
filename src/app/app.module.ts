// NG2
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { AppComponent } from './app.component';
import { AppBridgeService } from './service/app-bridge.service';
import {SettingsService} from './service/settings/settings.service';

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
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    // Vendor
    NovoElementsModule,
    // APP
  ],
  providers: [
    AppBridgeService,
    SettingsService
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
