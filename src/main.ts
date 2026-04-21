import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (environment.production) {
  // Enable production mode if needed
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
