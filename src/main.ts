import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter, Route, RouterModule, withHashLocation } from '@angular/router';
import { NovoElementsModule } from 'novo-elements';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppBridgeService } from './app/tools/service/app-bridge.service';
import { environment } from './environments/environment';

if (environment.production) {
  // Enable production mode if needed
  enableProdMode();
}

const routes: Route[] = [
  { path: '', redirectTo: '', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
      provideRouter(routes, withHashLocation()),
      provideAnimations(),
      importProvidersFrom(NovoElementsModule),
      AppBridgeService
  ]
}).catch(err => console.error(err));
