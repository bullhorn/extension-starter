// NG
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppBridgeService} from './tools/service/app-bridge.service';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    NovoElementsModule
  ],
  providers: [
    AppBridgeService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
