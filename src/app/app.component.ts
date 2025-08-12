// NG2
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NovoElementsModule } from 'novo-elements';
// Vendor
// APP

@Component({
  selector: 'platform-root',
  standalone: true,
  imports: [RouterOutlet, NovoElementsModule],
  template: `
    <novo-title>
      Hello World!
    </novo-title>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
