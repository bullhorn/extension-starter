// NG
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Vendor
import { NovoElementsModule } from 'novo-elements';
// APP
import { AppComponent } from './app.component';
import {AppBridgeService} from './tools/service/app-bridge.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from "./tools/modal/modal.module";
import { StandardModalComponent } from './tools/modal/standard/standard-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NovoElementsModule,
    BrowserAnimationsModule,
    ModalModule
],
  providers: [
    AppBridgeService,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}