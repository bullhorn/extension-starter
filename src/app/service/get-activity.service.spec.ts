import { TestBed, inject } from '@angular/core/testing';

import { GetActivityService } from './get-activity.service';

describe('GetActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetActivityService]
    });
  });

  it('should be created', inject([GetActivityService], (service: GetActivityService) => {
    expect(service).toBeTruthy();
  }));
});
