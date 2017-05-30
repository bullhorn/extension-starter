// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Vendor
import { NovoElementsModule, NovoElementProviders, AppBridge } from 'novo-elements';
import { Observable } from 'rxjs/Observable';
// APP
import { SampleComponent } from './sample.component';
import { environment } from '../../environments/environment';

export const routes: Routes = [
  { path: '', component: SampleComponent, pathMatch: 'full' }
];

const bridge = new AppBridge('SampleExtension');
bridge.tracing = true;
bridge.register(environment.appBridgeConfig.sample);

export function setupAppBridge() {
  return bridge;
}

@NgModule({
  imports: [
    // NG2
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // Vendor
    NovoElementsModule,
    NovoElementProviders.forRoot()
  ],
  declarations: [
    // APP
    SampleComponent
  ],
  providers: [
    // Vendor Overrides
    { provide: AppBridge, useFactory: setupAppBridge }
    // APP
  ]
})
export class SampleModule { }
