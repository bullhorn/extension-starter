// NG2
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Vendor
// APP

@Component({
  selector: 'platform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
title='app'
  constructor() { }

  ngOnInit() {
  }
}
