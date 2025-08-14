import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StandardModalComponent} from './standard-modal.component';

describe('StandardModalComponent', () => {
  let component: StandardModalComponent;
  let fixture: ComponentFixture<StandardModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
