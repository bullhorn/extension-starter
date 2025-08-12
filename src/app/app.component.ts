// NG2
import { Component } from '@angular/core';
// Vendor
// APP

@Component({
  selector: 'platform-root',
  template: `
    <novo-title>
      Hello World!
    </novo-title>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
