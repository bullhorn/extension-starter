// NG
import { Component, OnInit } from '@angular/core';
// Vendor
import { AppBridge } from 'novo-elements';
// APP
import { AppBridgeService } from '../service/app-bridge.service';

@Component({
  selector: 'platform-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit {
  constructor(private appBridge: AppBridgeService) {}

  ngOnInit() {}

  refresh(): void {
    this.appBridge.execute((bridge: AppBridge) => {
      bridge.refresh().then((success: any) => {
        console.log('[AppComponent] - Refresh Success!', success); // tslint:disable-line
      });
    });
  }

  close(): void {
    this.appBridge.execute((bridge: AppBridge) => {
      bridge.close().then((success: any) => {
        console.log('[AppComponent] - Close Success!', success); // tslint:disable-line
      });
    });
  }
}
