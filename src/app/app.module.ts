// NG2
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule,RouterOutlet  } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http'; 
import { NovoElementsModule, NovoElementProviders, AppBridge } from 'novo-elements';
// APP
import { AppComponent } from './app.component';
import {SettingsService} from './service/settings/settings.service';
import { AppBridgeService } from './service/app-bridge.service';
import {GetActivityService} from './service/get-activity.service';
import { SampleComponent } from './sample/sample.component';
const routes: Routes = [
  // { path: '', loadChildren: './sample/sample.module#SampleModule' },
  //{ path: 'sample',  },
  // { path: '', redirectTo: 'sample', pathMatch: 'full' },
  // { path: 'sample', loadChildren: './sample/sample.module#SampleModule' },
  { path: '', component: SampleComponent },
  
  // { path: 'sample', loadChildren: './sample/sample.module#SampleModule' }
];

@NgModule({
  declarations: [
    // Main Entry Component
    AppComponent,
    SampleComponent,
    // Modals/Popovers
  ],
  imports: [
    // NG2
    BrowserModule,
    //RouterModule.forRoot(routes, { useHash: true }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule,
    
    // Vendor
    NovoElementsModule,
    
    // APP
  ],
  providers: [
    SettingsService,
    AppBridgeService,
    GetActivityService,
    RouterOutlet

    // Vendor Overrides
    // APP
  ],
  exports:[RouterModule],
  bootstrap: [
    // Main Entry Component
    AppComponent
    // Modals/Popovers
  ]
})
export class AppModule { }
